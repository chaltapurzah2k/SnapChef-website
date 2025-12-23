import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import RecipeCard from '../components/RecipeCard';
import NutritionPanel from '../components/NutritionPanel';
import RestaurantFinder from '../components/RestaurantFinder';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/storageService';
import { Heart } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [nutrition, setNutrition] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Auto-save to history when new recipe is generated
    useEffect(() => {
        if (recipe && nutrition && user) {
            storageService.addToHistory(user.id, recipe, nutrition);
            // Check if it's already a favorite (unlikely for new generation, but good practice)
            const favs = storageService.getUserFavorites(user.id);
            const exists = favs.some(f => f.recipe.name === recipe.name);
            setIsFavorite(exists);
        }
    }, [recipe, nutrition, user]);

    const handleToggleFavorite = () => {
        if (!user || !recipe) return;
        storageService.toggleFavorite(user.id, { recipe, nutrition });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!recipe && (
                <div className="max-w-2xl mx-auto">
                    <ImageUpload
                        setRecipe={setRecipe}
                        setNutrition={setNutrition}
                        setRestaurants={setRestaurants}
                        setLoading={setLoading}
                    />
                </div>
            )}

            {loading && (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Analyzing your delicious food...</p>
                </div>
            )}

            {recipe && !loading && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleToggleFavorite}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all
                                ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400'}
                            `}
                        >
                            <Heart className={isFavorite ? "fill-current" : ""} />
                            {isFavorite ? "Saved to Favorites" : "Save Recipe"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <RecipeCard recipe={recipe} />
                        </div>
                        <div className="md:col-span-1">
                            <NutritionPanel nutrition={nutrition} />
                        </div>
                        <div className="md:col-span-1">
                            <RestaurantFinder restaurants={restaurants} dishName={recipe.name} />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setRecipe(null);
                                setNutrition(null);
                                setRestaurants([]);
                            }}
                            className="text-orange-600 font-bold hover:underline"
                        >
                            Scan Another Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
