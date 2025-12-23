import React from 'react';
import { Clock, Users, ChefHat, Flame, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const RecipeCard = ({ recipe }) => {
    if (!recipe) return null;

    const handleShare = async () => {
        const text = `Check out this recipe for ${recipe.name} I found on SnapChef!\n\n${recipe.description}\n\nPrep: ${recipe.prepTime} | Cook: ${recipe.cookTime}\n\nIngredients:\n${recipe.ingredients.map(i => `- ${i.name}: ${i.quantity}`).join('\n')}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: recipe.name,
                    text: text,
                    url: "https://chaltapurzah2k.github.io/SnapChef-website/",
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            await navigator.clipboard.writeText(text);
            alert('Recipe copied to clipboard!');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 sticky top-24">
            <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <ChefHat size={20} />
                    Recipe
                </h2>
                <button
                    onClick={handleShare}
                    className="p-2 hover:bg-orange-600 rounded-full transition-colors bg-orange-500/50"
                    title="Share Recipe"
                >
                    <Share2 size={18} />
                </button>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{recipe.description}</p>

                <div className="flex justify-between text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg">
                    <div className="text-center">
                        <Clock size={16} className="mx-auto mb-1 text-orange-500" />
                        <span>{recipe.prepTime}</span>
                    </div>
                    <div className="text-center border-l border-gray-200 pl-3">
                        <Flame size={16} className="mx-auto mb-1 text-orange-500" />
                        <span>{recipe.cookTime}</span>
                    </div>
                    <div className="text-center border-l border-gray-200 pl-3">
                        <Users size={16} className="mx-auto mb-1 text-orange-500" />
                        <span>{recipe.servings} serving</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Ingredients</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{ing.name}</span>
                                <span className="font-medium text-gray-800">{ing.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Instructions</h4>
                    <div className="space-y-4 text-sm text-gray-600">
                        {recipe.steps.map((step, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
