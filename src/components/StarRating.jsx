import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate, readonly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => !readonly && onRate && onRate(star)}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(0)}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-colors duration-200`}
                >
                    <Star
                        size={20}
                        className={`${star <= (hover || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
