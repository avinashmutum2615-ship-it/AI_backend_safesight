import { llm } from "../config/gemini.js";
import { getRetriever } from "./retriever.js";

export async function answerQuestion(question) {
    const retriever = getRetriever();

    const docs = await retriever.invoke(question);

    const context = docs
        .map(doc => doc.pageContent)
        .join("\n\n");

    const prompt = `
You are SafeSight AI.

Context:
${context}

Question:
${question}
`;

    const response = await llm.invoke(prompt);

    return response.content;
}