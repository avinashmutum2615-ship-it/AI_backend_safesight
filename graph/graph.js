import { StateGraph, START, END } from "@langchain/langgraph";
import { ToolNode, toolsCondition } from "@langchain/langgraph/prebuilt";

import { State } from "./state.js";
import { aiNode } from "./nodes/aiNode.js";
import { tools } from "../tools/index.js";

const builder = new StateGraph(State);

builder.addNode("ai", aiNode);

builder.addNode("tools", new ToolNode(tools));

builder.addEdge(START, "ai");

builder.addConditionalEdges(
    "ai",
    toolsCondition,
    {
        tools: "tools",
        __end__: END,
    }
);

builder.addEdge("tools", "ai");

export const graph = builder.compile();