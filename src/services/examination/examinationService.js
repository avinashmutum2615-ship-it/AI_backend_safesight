import Examination from "../../models/Examination.js";
import Appointment from "../../models/Appointment.js";
import { getPatientDocument } from "../patient/patientService.js";

export async function saveExaminationService(
    doctorId,
    patientKeyword,
    data
) {

    const patient = await getPatientDocument(patientKeyword);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    const appointment = await Appointment.findOne({
        patient: patient._id,
        doctor: doctorId,
        status: "In Consultation",
        isActive: true,
    });

    if (!appointment) {
        throw new Error(
            "No consultation is currently in progress for this patient."
        );
    }

    let examination = await Examination.findOne({
        appointment: appointment._id,
    });

    if (!examination) {

        examination = new Examination({
            appointment: appointment._id,
            patient: patient._id,
            doctor: doctorId,
        });

    }

    examination.chiefComplaint =
        data.chiefComplaint ?? examination.chiefComplaint;

    examination.visualAcuity =
        data.visualAcuity ?? examination.visualAcuity;

    examination.intraocularPressure =
        data.intraocularPressure ?? examination.intraocularPressure;

    examination.slitLamp =
        data.slitLamp ?? examination.slitLamp;

    examination.fundus =
        data.fundus ?? examination.fundus;

    examination.diagnosis =
        data.diagnosis ?? examination.diagnosis;

    examination.notes =
        data.notes ?? examination.notes;

    await examination.save();

    return examination;

}