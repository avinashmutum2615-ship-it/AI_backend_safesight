import Patient from "../models/Patient.js";

export async function generatePatientId() {

    const lastPatient = await Patient
        .findOne()
        .sort({ createdAt: -1 });

    if (!lastPatient) {
        return "PAT000001";
    }

    const number = parseInt(
        lastPatient.patientId.replace("PAT", ""),
        10
    );

    return `PAT${String(number + 1).padStart(6, "0")}`;
}