import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { image, mimeType } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not configured.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
          data: image,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean up code blocks if present
    const cleanText = text.replace(/```json|```/g, '').trim();
    // Parse to ensure validity before sending
    const data = JSON.parse(cleanText);

    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze image" });
  }
}
