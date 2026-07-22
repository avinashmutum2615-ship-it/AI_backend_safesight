import { llm } from "./gemini.js";

import {
    receptionistPrompt,
    publicPrompt,
    doctorPrompt,
} from "../prompts/index.js";

import { tools } from "../tools/index.js";
import { publicTools } from "../tools/public/index.js";
import { doctorTools } from "../tools/doctor/index.js";

export const agentRegistry = {

    receptionist: {
        prompt: receptionistPrompt,
        model: llm.bindTools(tools),
    },

    public: {
        prompt: publicPrompt,
        model: llm.bindTools(publicTools),
    },

    doctor: {
        prompt: doctorPrompt,
        model: llm.bindTools(doctorTools),
    },

};