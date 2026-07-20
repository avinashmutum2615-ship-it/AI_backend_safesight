import { SystemMessage } from "@langchain/core/messages";

import { llm } from "../config/gemini.js";
import { receptionistPrompt } from "../prompts/index.js";
import { tools } from "../tools/index.js";

const model = llm.bindTools(tools);

export async function chatbotNode(state) {

    const response = await model.invoke([
        new SystemMessage(receptionistPrompt),
        ...state.messages,
    ]);

    return {
        messages: [response],
    };

}