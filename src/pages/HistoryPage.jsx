import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/storageService';
import StarRating from '../components/StarRating';
import { Clock, Calendar } from 'lucide-react';

const HistoryPage = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            setHistory(storageService.getUserHistory(user.id));
        }
    }, [user]);

    const handleRate = (itemId, rating) => {
        storageService.updateRating(itemId, rating);
        setHistory(prev => prev.map(item =>
            item.id === itemId ? { ...item, rating } : item
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Clock className="text-orange-500" />
                Scan History
            </h1>

            {history.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
                    <p>No history yet. Start scanning some food!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{item.recipe.name}</h3>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <Calendar size={12} />
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.recipe.description}</p>

                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {item.nutrition.tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Rate Analysis:</span>
                                <StarRating
                                    rating={item.rating}
                                    onRate={(r) => handleRate(item.id, r)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
