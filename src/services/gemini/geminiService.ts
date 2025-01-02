import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from './config';

const genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);

export const generateResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.MODEL });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};