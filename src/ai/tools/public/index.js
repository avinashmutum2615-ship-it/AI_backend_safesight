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

import { getClinicInfoTool } from "../clinic/index.js";

export const publicTools = [
    getClinicInfoTool,
    searchPatientTool,
    createPatientTool,
    searchDoctorTool,
    getAvailableSlotsTool,
    createAppointmentTool,
    ...knowledgeTools,
];