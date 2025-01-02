import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from './config';

const genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);

export const analyzeImage = async (imageData: string, prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData.split(',')[1] // Remove data URL prefix
        }
      }
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    return 'Sorry, I encountered an error analyzing the image.';
  }
};