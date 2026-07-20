import { getAvailableSlotsTool } from "./getAvailableSlotsTool.js";
import { createAppointmentTool } from "./createAppointmentTool.js";
import { updateAppointmentTool } from "./updateAppointmentTool.js";
import { cancelAppointmentTool } from "./cancelAppointmentTool.js";
import { searchAppointmentsTool } from "./searchAppointmentsTool.js";
import { todayAppointmentsTool } from "./todayAppointmentsTool.js";


export const appointmentTools = [
    getAvailableSlotsTool,
    createAppointmentTool,
    updateAppointmentTool,
    cancelAppointmentTool,
    searchAppointmentsTool,
    todayAppointmentsTool,
];