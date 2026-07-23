import { SystemMessage } from "@langchain/core/messages";
import { agentRegistry } from "../config/agentRegistry.js";
import {
    logInfo,
    logSuccess,
    logError,
} from "../../../utils/logger.js";


export async function chatbotNode(state, config) {

    const startTime = Date.now();

    try {

        logInfo("Chatbot Node Started", {
            messages: state.messages.length,
        });

        const agentType =
         config.configurable?.agent || "receptionist";

        const agent =
            agentRegistry[agentType] ??
            agentRegistry.receptionist;

        const response = await agent.model.invoke(
    state.messages
);

        logSuccess("LLM Response Generated", {
            executionTime: `${Date.now() - startTime} ms`,
            toolCalls: response.tool_calls?.length ?? 0,
        });

        if (response.tool_calls?.length) {

            logInfo("Tool Calls", {
                tools: response.tool_calls.map(tool => tool.name),
            });

        }

        return {
            messages: [response],
        };

    } catch (error) {

        logError("Chatbot Node Error", error);

        throw error;

    }

}