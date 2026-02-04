import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = env.GOOGLE_AI_API_KEY
  ? new GoogleGenerativeAI(env.GOOGLE_AI_API_KEY)
  : null;

export default googleAI;
