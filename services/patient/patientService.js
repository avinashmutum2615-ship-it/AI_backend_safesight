import Patient from "../../models/Patient.js";
import { generatePatientId } from "../../utils/generatePatientId.js";

export async function createPatientService(data) {

    const existingPatient = await Patient.findOne({
        phone: data.phone,
    });

    if (existingPatient) {
        throw new Error("Patient already exists.");
    }

    const patientId = await generatePatientId();

    const patient = await Patient.create({

        patientId,

        firstName: data.firstName,

        lastName: data.lastName,

        gender: data.gender,

        dateOfBirth: data.dateOfBirth,

        phone: data.phone,

        email: data.email,

        address: data.address,

        bloodGroup: data.bloodGroup,

        emergencyContact: data.emergencyContact,

    });

    return patient;

}