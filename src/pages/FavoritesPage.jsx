import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/storageService';
import { Heart, ChefHat } from 'lucide-react';
import RecipeCard from '../components/RecipeCard'; // We can reuse this or make a mini version

const FavoritesPage = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        if (user) {
            setFavorites(storageService.getUserFavorites(user.id));
        }
    }, [user]);

    const removeFavorite = (item) => {
        const updated = storageService.toggleFavorite(user.id, item);
        setFavorites(updated);
        if (selectedRecipe?.id === item.id) setSelectedRecipe(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Heart className="text-orange-500 fill-orange-500" />
                Your Cookbook
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Column */}
                <div className="lg:col-span-1 space-y-4">
                    {favorites.length === 0 && (
                        <p className="text-gray-500">No favorites yet.</p>
                    )}
                    {favorites.map(fav => (
                        <div
                            key={fav.id}
                            onClick={() => setSelectedRecipe(fav)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all
                                ${selectedRecipe?.id === fav.id
                                    ? 'bg-orange-50 border-orange-500 shadow-md'
                                    : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-sm'}
                            `}
                        >
                            <h3 className="font-bold text-gray-800">{fav.recipe.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">{fav.recipe.prepTime} prep</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFavorite(fav); }}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <Heart size={16} className="fill-current" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Column */}
                <div className="lg:col-span-2">
                    {selectedRecipe ? (
                        <div className="animate-fadeIn">
                            <RecipeCard recipe={selectedRecipe.recipe} />
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-400 border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center">
                            <ChefHat size={48} className="mb-4 opacity-20" />
                            <p>Select a recipe to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
