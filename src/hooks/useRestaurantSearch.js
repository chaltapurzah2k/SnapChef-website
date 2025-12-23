import { useState } from 'react';

export const useRestaurantSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchRestaurants = async (dishName, location) => {
        setLoading(true);
        setError(null);

        return new Promise((resolve) => {
            setTimeout(() => {
                setLoading(false);
                resolve([
                    { name: "Bella Italia", distance: "0.5 miles", rating: 4.5, price: "$$" },
                    { name: "Luigi's Scoops", distance: "1.2 miles", rating: 4.8, price: "$" }
                ]);
            }, 1000);
        });
    };

    return { searchRestaurants, loading, error };
};
