import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyBs0S5P-fln7WlxvJnXVw5sISN4DlmIv74";
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
