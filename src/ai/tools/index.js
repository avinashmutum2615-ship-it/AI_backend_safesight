import {
    searchPatientTool,
    createPatientTool,
} from "./patient/index.js";

import {
    searchDoctorTool,
} from "./doctor/index.js";

import { appointmentTools } from "./appointment/index.js";

export const tools = [
    searchPatientTool,
    createPatientTool,
    searchDoctorTool,
    ...appointmentTools,
];