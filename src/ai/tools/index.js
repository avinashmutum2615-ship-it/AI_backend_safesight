import {
    searchPatientTool,
    createPatientTool,
} from "./patient/index.js";

import {
    searchDoctorTool,
} from "./doctor/index.js";

import { appointmentTools } from "./appointment/index.js";
import { knowledgeTools } from "./knowledge/index.js";

import { doctorTools } from "./doctor/index.js";
import { clinicTools } from "./clinic/index.js";

export const tools = [
    searchPatientTool,
    createPatientTool,
    ...doctorTools,
    ...appointmentTools,
    ...knowledgeTools,
    ...clinicTools,
];