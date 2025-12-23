import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const useImageAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeImage = async (file) => {
        setLoading(true);
        setError(null);

        try {
            if (!API_KEY) {
                throw new Error("Google API Key is missing. Please check your .env file.");
            }

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            // Convert file to base64
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });

            const prompt = `Analyze this food image and generate a detailed recipe and nutritional breakdown. 
            Return ONLY a valid JSON object with the following structure, no markdown formatting or backticks:
            {
                "recipe": {
                    "name": "Recipe Name",
                    "description": "Short appetizing description",
                    "ingredients": [
                        { "name": "Ingredient 1", "quantity": "amount" },
                        { "name": "Ingredient 2", "quantity": "amount" }
                    ],
                    "steps": [
                        "Step 1...",
                        "Step 2..."
                    ],
                    "prepTime": "XX mins",
                    "cookTime": "XX mins",
                    "difficulty": "Easy/Medium/Hard",
                    "servings": Number
                },
                "nutrition": {
                    "calories": Number,
                    "macros": { "protein": "XXg", "carbs": "XXg", "fats": "XXg" },
                    "breakdown": [
                        { "name": "Ingredient Name", "protein": "XXg", "carbs": "XXg", "fats": "XXg" }
                    ],
                    "tags": ["Tag1", "Tag2"]
                }
            }
            If the image is not food, return an error message in the JSON.`;

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type
                    }
                }
            ]);

            const response = await result.response;
            const text = response.text();

            // Clean up code blocks if present (sometimes models add \`\`\`json ...)
            const cleanText = text.replace(/```json|```/g, '').trim();
            const data = JSON.parse(cleanText);

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
