import crypto from "crypto";

import { doctorAgent } from "../../src/ai/agents/index.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../utils/logger.js";

export async function doctorChat(req, res) {

    try {

        const {
            message,
            threadId: incomingThreadId,
        } = req.body;

        if (!message) {

            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });

        }

        const threadId =
            incomingThreadId || crypto.randomUUID();

        logInfo("Incoming Doctor AI Request", {
            threadId,
            doctorId: req.user.id,
            message,
        });

        const response = await doctorAgent({

            message,

            threadId,

            user: req.user,

        });

        logSuccess("Doctor AI Response Generated", {
            threadId,
            doctorId: req.user.id,
        });

        return res.json({

            success: true,

            threadId,

            response: response.content,

        });

    } catch (error) {

        logError("Doctor AI Error", error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}