import {
    HumanMessage,
    AIMessage,
} from "@langchain/core/messages";

import { receptionistAgent } from "../../src/ai/agents/index.js";

export async function chat(req, res) {

    try {

        const { messages, threadId } = req.body;

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

        return res.json({
            success: true,
            response: response.content,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}