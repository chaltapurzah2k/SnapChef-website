import React from 'react';
import { Activity, Leaf } from 'lucide-react';

const NutritionPanel = ({ nutrition }) => {
    if (!nutrition) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-green-600 p-4 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Activity size={20} />
                    Nutrition
                </h2>
            </div>
            <div className="p-6">
                <div className="text-center mb-6">
                    <span className="text-5xl font-bold text-gray-800">{nutrition.calories}</span>
                    <span className="text-gray-500 block">Calories / serving</span>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">Protein</span>
                            <span className="text-gray-900 font-bold">{nutrition.macros.protein}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">Carbs</span>
                            <span className="text-gray-900 font-bold">{nutrition.macros.carbs}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">Fats</span>
                            <span className="text-gray-900 font-bold">{nutrition.macros.fats}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                    </div>
                </div>

            </div>

            {nutrition.breakdown && (
                <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm border-b pb-2">Ingredient Breakdown</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-100">
                                    <th className="pb-2 font-medium">Item</th>
                                    <th className="pb-2 font-medium text-right text-blue-600">P</th>
                                    <th className="pb-2 font-medium text-right text-yellow-600">C</th>
                                    <th className="pb-2 font-medium text-right text-red-600">F</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {nutrition.breakdown.map((item, i) => (
                                    <tr key={i}>
                                        <td className="py-2 font-medium text-gray-700">{item.name}</td>
                                        <td className="py-2 text-right">{item.protein}</td>
                                        <td className="py-2 text-right">{item.carbs}</td>
                                        <td className="py-2 text-right">{item.fats}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="p-6 pt-0">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">Dietary Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {nutrition.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <Leaf size={12} />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NutritionPanel;
