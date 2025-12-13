import { GoogleGenAI } from "@google/genai";

const getClient = (): GoogleGenAI => {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
        console.warn("API Key not found in process.env");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateSeoDescription = async (content: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Read the following blog post content and generate a concise, engaging SEO meta description (max 160 characters). Do not use quotes or markdown in the output. Just the raw text.
            
            ---
            ${content}
            ---`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Could not generate description. Please check API Key.";
    }
};

export const improveGrammar = async (text: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a strict technical editor. Fix any grammar issues and improve the clarity of the following text. Keep the tone professional and minimal. Return ONLY the corrected text.
            
            ---
            ${text}
            ---`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini Error:", error);
        return text;
    }
};
