import { SystemMessage } from "@langchain/core/messages";

import { llm } from "../config/gemini.js";
import { publicPrompt } from "../prompts/index.js";
import { publicTools } from "../tools/public/index.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../utils/logger.js";

const publicModel = llm.bindTools(publicTools);

export async function publicChatbotNode(state) {

    const startTime = Date.now();

    try {

        logInfo("Public Chatbot Node Started", {
            messages: state.messages.length,
        });

        const response = await publicModel.invoke([
            new SystemMessage(publicPrompt),
            ...state.messages,
        ]);

        logSuccess("Public LLM Response Generated", {
            executionTime: `${Date.now() - startTime} ms`,
            toolCalls: response.tool_calls?.length ?? 0,
        });

        return {
            messages: [response],
        };

    } catch (error) {

        logError("Public Chatbot Node Error", error);

        throw error;
    }
}