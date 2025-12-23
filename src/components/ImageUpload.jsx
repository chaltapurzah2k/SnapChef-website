import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';

const ImageUpload = ({ setRecipe, setNutrition, setRestaurants, setLoading }) => {
    const { analyzeImage, loading: analyzing } = useImageAnalysis();
    const { searchRestaurants, loading: searching } = useRestaurantSearch();
    const [uploadError, setUploadError] = useState(null);

    const processFile = async (file) => {
        setUploadError(null);
        setLoading(true);
        console.log("Processing file:", file.name);

        try {
            // 1. Analyze Image
            const analysisResult = await analyzeImage(file);
            console.log("Analysis Result:", analysisResult);

            if (!analysisResult || !analysisResult.recipe) {
                throw new Error("Failed to generate recipe from image.");
            }

            setRecipe(analysisResult.recipe);
            setNutrition(analysisResult.nutrition);

            // 2. Search Restaurants
            const restaurantsResult = await searchRestaurants(analysisResult.recipe.name, "current-location");
            setRestaurants(restaurantsResult);

        } catch (error) {
            console.error("Error processing:", error);
            setUploadError(error.message || "Something went wrong during analysis.");
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            await processFile(acceptedFiles[0]);
        }
    }, [processFile]);

    const handleDemoImage = async () => {
        try {
            setUploadError(null);
            setLoading(true);
            const response = await fetch('/demo-food.jpg');
            if (!response.ok) throw new Error("Could not load demo image");

            const blob = await response.blob();
            const file = new File([blob], "demo-food.jpg", { type: "image/jpeg" });
            await processFile(file);
        } catch (error) {
            console.error("Demo analysis failed", error);
            setUploadError("Failed to load demo image.");
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What are you eating?</h2>
            <p className="text-gray-600 mb-8">Upload a photo to get the recipe, nutrition info, and local spots.</p>

            {uploadError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center justify-center gap-2 max-w-lg mx-auto border border-red-200">
                    <AlertCircle size={20} />
                    <span>{uploadError}</span>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`border-3 border-dashed rounded-xl p-12 cursor-pointer transition-colors mb-6
            ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-4">
                    <div className={`p-4 rounded-full ${isDragActive ? 'bg-orange-100' : 'bg-gray-100'}`}>
                        {isDragActive ? (
                            <Upload className="w-8 h-8 text-orange-500" />
                        ) : (
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-lg text-gray-700">
                            {isDragActive ? "Drop it here!" : "Drag & drop your food photo"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDemoImage}
                className="text-sm text-orange-600 font-medium hover:text-orange-700 underline flex items-center justify-center gap-2 mx-auto"
            >
                <ImageIcon size={16} />
                Or try with the Demo Image
            </button>
        </motion.div>
    );
};

export default ImageUpload;
