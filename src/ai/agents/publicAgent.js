import { HumanMessage } from "@langchain/core/messages";

import { chatbotGraph } from "../graph/index.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../utils/logger.js";

export async function publicAgent({
    message,
    threadId,
}) {

    const startTime = Date.now();

    try {

        logInfo("Public Agent Started", {
            threadId,
        });

        const result = await chatbotGraph.invoke(
            {
                messages: [
                    new HumanMessage(message),
                ],
            },
            {
                configurable: {
                    thread_id: threadId,
                    agent: "public",
                    user: {
                        id: "PUBLIC_USER",
                        name: "Guest",
                        role: "public",
                    },
                },
            }
        );

        logSuccess("Public Agent Finished", {
            threadId,
            executionTime: `${Date.now() - startTime} ms`,
        });

        return result.messages.at(-1);

    } catch (error) {

        logError("Public Agent Error", error);

        throw error;
    }

}