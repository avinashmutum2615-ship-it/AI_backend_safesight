import { updateDoctorAvailabilityTool } from "./updateDoctorAvailabilityTool.js";
import { searchDoctorTool } from "./searchDoctorTool.js";
import { getPatientHistoryTool } from "./getPatientHistoryTool.js";
import { getTodayAppointmentsTool } from "./getTodayAppointmentsTool.js";
import { startConsultationTool } from "./startConsultationTool.js";
import { saveExaminationTool } from "./saveExaminationTool.js";
import { startVisitTool } from "./startVisitTool.js";
import { createPrescriptionTool } from "./createPrescriptionTool.js";

export {
    updateDoctorAvailabilityTool,
    searchDoctorTool,
    getPatientHistoryTool,
    getTodayAppointmentsTool,
    startConsultationTool,
    saveExaminationTool,
    startVisitTool,
    createPrescriptionTool,
};

export const doctorTools = [
    updateDoctorAvailabilityTool,
    getPatientHistoryTool,
    getTodayAppointmentsTool,
    startConsultationTool,
    saveExaminationTool,
    startVisitTool,
    createPrescriptionTool,
];