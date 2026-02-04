/**
 * Helper function to get an available Google AI model
 * Tries multiple models in order of preference
 */
import googleAI from "./google-ai";

export async function getAvailableModel() {
  if (!googleAI) {
    throw new Error("Google AI is not configured");
  }

  const modelNames = [
    "gemini-pro", // Most stable, widely available
    "gemini-1.5-pro", // Latest pro model
    "gemini-1.5-flash", // Fast model
  ];

  for (const modelName of modelNames) {
    try {
      const model = googleAI.getGenerativeModel({ model: modelName });
      // Try a simple test generation to verify the model works
      const testResult = await model.generateContent("test");
      await testResult.response;
      // If we get here, the model works
      return modelName;
    } catch (error) {
      console.warn(`Model ${modelName} is not available:`, error);
      continue;
    }
  }

  // If no model works, return the first one as fallback
  // The error will be handled by the calling function
  return modelNames[0];
}
