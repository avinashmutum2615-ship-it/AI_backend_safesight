import { publicAgent } from "../../ai/agents/index.js";

import crypto from "crypto";

import { logInfo, logSuccess, logError } from "../../../utils/logger.js";

export async function publicChat(req, res) {

    try {

        const {
            message,
            threadId: incomingThreadId,
        } = req.body;

        const threadId =
            incomingThreadId || crypto.randomUUID();

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        logInfo("Incoming Public AI Request", {
            threadId,
            message,
        });

        const response = await publicAgent({
            message,
            threadId,
        });

        logSuccess("Public AI Response Generated", {
            threadId,
        });

        return res.json({
            success: true,
            threadId,
            response: response.content,
        });

    } catch (error) {

        logError("Public AI Error", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}