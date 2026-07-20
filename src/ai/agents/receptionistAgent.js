import { chatbotGraph } from "../graph/index.js";

export async function receptionistAgent({
    messages,
    threadId,
    user,
}) {

    const result = await chatbotGraph.invoke(
        {
            messages,
        },
        {
            configurable: {
                thread_id: threadId,
                user,
            },
        }
    );

    return result.messages.at(-1);

}