import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-3.5-flash",
    temperature: 0,
});

try {
    const response = await llm.invoke("Say hello in one sentence.");
    console.log(response.content);
} catch (err) {
    console.error(err);
}