import { HumanMessage } from "@langchain/core/messages";

import { chatbotGraph } from "../graph/index.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../utils/logger.js";

export async function doctorAgent({
    message,
    threadId,
    user,
}) {

    const startTime = Date.now();

    try {

        logInfo("Doctor Agent Started", {
            threadId,
            doctorId: user.id,
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
                    agent: "doctor",
                    user,
                },
            }
        );

        logSuccess("Doctor Agent Finished", {
            threadId,
            executionTime: `${Date.now() - startTime} ms`,
        });

        return result.messages.at(-1);

    } catch (error) {

        logError("Doctor Agent Error", error);

        throw error;

    }

}