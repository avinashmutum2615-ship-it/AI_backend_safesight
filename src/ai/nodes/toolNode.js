import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tools } from "../tools/index.js";

export const toolNode = new ToolNode(tools);