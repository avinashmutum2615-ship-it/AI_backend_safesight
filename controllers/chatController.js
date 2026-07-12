import { graph } from "../graph/graph.js";

export const chat = async (req, res) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        const result = await graph.invoke({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        const finalMessage =
            result.messages[result.messages.length - 1];

        res.status(200).json({
            success: true,
            reply: finalMessage.content,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};