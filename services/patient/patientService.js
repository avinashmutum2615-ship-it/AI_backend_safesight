import Patient from "../../models/Patient.js";
import { generatePatientId } from "../../utils/generatePatientId.js";
import { patientResponse } from "../../utils/dto/patientResponse.js";

export async function createPatientService(data) {

    const patientId = await generatePatientId();

    const patient = new Patient({
        patientId,
        name: data.name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        phone: data.phone,
        email: data.email,
        address: data.address,
        bloodGroup: data.bloodGroup,
        emergencyContact: data.emergencyContact,
    });

    await patient.save();

    return patientResponse(patient);

}

export async function getAllPatientsService() {

    const patients = await Patient
        .find({ isActive: true })
        .sort({ createdAt: -1 });

    return patients.map(patient => patientResponse(patient));

}

export async function getPatientByIdService(id) {

    const patient = await Patient.findById(id);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    return patientResponse(patient);

}

export async function searchPatientsService(keyword) {

    const patients = await Patient.find({
        isActive: true,
        $or: [
            {
                patientId: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                phone: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ],
    });

    return patients.map(patient => patientResponse(patient));

}

export async function updatePatientService(id, data) {

    const patient = await Patient.findById(id);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    patient.name = data.name;
    patient.gender = data.gender;
    patient.dateOfBirth = data.dateOfBirth;
    patient.phone = data.phone;
    patient.email = data.email;
    patient.address = data.address;
    patient.bloodGroup = data.bloodGroup;
    patient.emergencyContact = data.emergencyContact;

    await patient.save();

    return patientResponse(patient);

}

export async function deletePatientService(id) {

    const patient = await Patient.findById(id);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    patient.isActive = false;

    await patient.save();

    return {
        message: "Patient deleted successfully.",
    };

}