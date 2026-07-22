import { z } from "zod";
import { createTool } from "../baseTool.js";
import { answerQuestion } from "../../rag/answerQuestion.js";

export const knowledgeSearchTool = createTool({
    name: "knowledge_search",

    description:
        "Search the clinic knowledge base to answer medical, disease, medicine, surgery, clinic policy and FAQ related questions.",

    schema: z.object({
        question: z.string(),
    }),

    handler: async ({ question }) => {
        return await answerQuestion(question);
    },
});