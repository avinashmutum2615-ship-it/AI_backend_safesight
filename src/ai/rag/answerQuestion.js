import { llm } from "../config/gemini.js";
import { getRetriever } from "./retriever.js";

export async function answerQuestion(question) {
    const retriever = getRetriever();

    const docs = await retriever.invoke(question);

    console.log(docs); 

    const context = docs
        .map(doc => `
    Source: ${doc.metadata.source}
    Category: ${doc.metadata.category}

    ${doc.pageContent}
    `)
        .join("\n\n");

    const prompt = `
    You are SafeSight AI, an ophthalmology assistant.

    Answer ONLY using the provided context.

    If the answer is not available in the context, reply:

    "I couldn't find that information in the clinic knowledge base."

    Always mention the document source when appropriate.

    Context:
    ${context}

    Question:
    ${question}
    `;

    const response = await llm.invoke(prompt);

    return response.content;
}