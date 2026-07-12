import { SystemMessage } from "@langchain/core/messages";
import { model } from "../../config/gemini.js";
import { tools } from "../../tools/index.js";
import { systemPrompt } from "../prompts/systemPrompt.js";

const modelWithTools = model.bindTools(tools);

export async function aiNode(state) {

    const response = await modelWithTools.invoke([
        new SystemMessage(systemPrompt),
        ...state.messages,
    ]);

    return {
        messages: [response],
    };
}