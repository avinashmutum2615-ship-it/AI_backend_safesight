import { searchDoctorTool } from "../doctor/index.js";

import {
    createAppointmentTool,
    getAvailableSlotsTool,
} from "../appointment/index.js";

import {
    knowledgeTools,
} from "../knowledge/index.js";

import {
    searchPatientTool,
    createPatientTool,
} from "../patient/index.js";

export const publicTools = [
    searchPatientTool,
    createPatientTool,
    searchDoctorTool,
    getAvailableSlotsTool,
    createAppointmentTool,
    ...knowledgeTools,
];