import Patient from "../models/Patient.js";

export async function generatePatientId() {

    const totalPatients = await Patient.countDocuments();

    const nextNumber = totalPatients + 1;

    return `SS-${String(nextNumber).padStart(6, "0")}`;
}