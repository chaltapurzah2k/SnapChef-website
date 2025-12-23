import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GOOGLE_API_KEY;

async function listModels() {
    if (!API_KEY) {
        console.error("No API key found in .env");
        return;
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to access system
        // Actually SDK doesn't have listModels directly exposed on the instance usually, 
        // but let's try a direct fetch if SDK doesn't support it easily for this version.
        // Or we can just try another model name blindly, but let's try to be scientific.

        console.log("Checking commonly used models...");
        const modelsToCheck = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-flash-latest", "gemini-pro"];

        for (const m of modelsToCheck) {
            try {
                console.log(`Testing availability of: ${m}`);
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("Hello");
                console.log(`SUCCESS: ${m} is working.`);
                return;
            } catch (e) {
                console.log(`FAILED: ${m} - ${e.message}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
