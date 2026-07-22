import {
    HumanMessage,
    AIMessage,
} from "@langchain/core/messages";

import crypto from "crypto";

import { receptionistAgent } from "../../src/ai/agents/index.js";
import { logInfo, logSuccess, logError } from "../../utils/logger.js";

export async function chat(req, res) {

    try {

        const {
            messages,
            threadId: incomingThreadId,
        } = req.body;

        const threadId =
            incomingThreadId || crypto.randomUUID();

        logInfo("Incoming AI Request", {
            user: req.user.name,
            role: req.user.role,
            threadId,
            messages,
        });

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Messages are required.",
            });
        }

        const chatMessages = messages.map((message) => {

            if (message.role === "assistant") {
                return new AIMessage(message.content);
            }

            return new HumanMessage(message.content);

        });

        const response = await receptionistAgent({
            messages: chatMessages,
            threadId,
            user: {
                id: req.user._id.toString(),
                role: req.user.role,
                name: req.user.name,
            },
        });

        logSuccess("AI Response Generated", {
            threadId,
            user: req.user.name,
        });

        return res.json({
            success: true,
            threadId,
            response: response.content,
        });

    } catch (error) {

        logError("AI Chat Error", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}