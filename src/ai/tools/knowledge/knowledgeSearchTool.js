import { z } from "zod";
import { createTool } from "../baseTool.js";
import { answerQuestion } from "../../rag/answerQuestion.js";

export const knowledgeSearchTool = createTool({
    name: "medical_knowledge_search",

    description: `
        Search ophthalmology medical knowledge.

        Use ONLY for:
        - eye diseases
        - symptoms
        - diagnosis
        - treatment
        - medicines
        - surgeries
        - patient education

        Never use for:
        - clinic information
        - clinic timings
        - address
        - phone number
        - email
        - consultation fees
        - clinic services
        - doctor information
        - appointment booking
        - appointment availability
        `,

    schema: z.object({
        question: z.string(),
    }),

    handler: async ({ question }) => {
        return await answerQuestion(question);
    },
});