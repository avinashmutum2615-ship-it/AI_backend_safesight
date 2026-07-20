import {
    START,
    END,
    StateGraph,
} from "@langchain/langgraph";

import {
    ToolNode,
    toolsCondition,
} from "@langchain/langgraph/prebuilt";

import { GraphState } from "./state.js";
import { chatbotNode } from "../nodes/chatbotNode.js";
import { tools } from "../tools/index.js";
import { checkpointer } from "../memory/checkpointer.js";

const graph = new StateGraph(GraphState);

graph.addNode("chatbot", chatbotNode);
graph.addNode("tools", new ToolNode(tools));

graph.addEdge(START, "chatbot");

graph.addConditionalEdges(
    "chatbot",
    toolsCondition,
);

graph.addEdge("tools", "chatbot");

export const chatbotGraph = graph.compile({
    checkpointer,
});