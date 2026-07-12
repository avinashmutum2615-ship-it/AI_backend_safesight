import { createPatientService } from "../services/patient/patientService.js";

export async function createPatient(req, res) {

    try {

        const patient = await createPatientService(req.body);

        res.status(201).json({
            success: true,
            patient,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}