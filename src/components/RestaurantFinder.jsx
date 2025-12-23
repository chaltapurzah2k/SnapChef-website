import React from 'react';
import { MapPin, Star, ExternalLink, Navigation } from 'lucide-react';

const RestaurantFinder = ({ restaurants, dishName }) => {
    if (!restaurants || restaurants.length === 0) return null;

    const handleOpenMaps = (query) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-orange-800 p-4 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <MapPin size={20} />
                    Nearby
                </h2>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {restaurants.map((place, i) => (
                        <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0 group">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors cursor-pointer"
                                    onClick={() => handleOpenMaps(place.name + " near me")}>
                                    {place.name}
                                </h3>
                                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{place.price}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                                <span className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-400 fill-current" />
                                    {place.rating}
                                </span>
                                <span className="">
                                    {place.distance}
                                </span>
                            </div>
                            <button
                                onClick={() => handleOpenMaps(place.name + " near me")}
                                className="mt-3 text-orange-600 text-sm font-medium flex items-center gap-1 hover:text-orange-700 transition-colors"
                            >
                                Get Directions <Navigation size={14} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400 mb-2">Want to find more places?</p>
                    <button
                        onClick={() => handleOpenMaps(dishName + " near me")}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        Find '{dishName}' on Maps <ExternalLink size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantFinder;
