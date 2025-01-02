import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyC9_tWhLz-XE-dS_b_GaNFm3jqnrei7TBY";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};