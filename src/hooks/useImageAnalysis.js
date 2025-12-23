import { useState } from 'react';

export const useImageAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeImage = async (file) => {
        setLoading(true);
        setError(null);

        try {
            // Convert file to base64
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Data,
                    mimeType: file.type
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to analyze image');
            }

            const data = await response.json();

            setLoading(false);
            return data;

        } catch (err) {
            console.error("Analysis failed:", err);
            setError(err.message || "Failed to analyze image");
            setLoading(false);
            throw err;
        }
    };

    return { analyzeImage, loading, error };
};
