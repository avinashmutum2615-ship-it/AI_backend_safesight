import Appointment from "../../models/Appointment.js";
import Visit from "../../models/Visit.js";
import generateVisitId from "../../../utils/generateVisitId.js";
import visitResponse from "../../../utils/dto/visitResponse.js";
import { getPatientDocument } from "../patient/patientService.js";

export const checkInAppointmentService = async (appointmentId) => {

    // Find appointment
    const appointment = await Appointment.findById(appointmentId)
        .populate({
            path: "patient",
            select: "patientId name phone"
        })
        .populate({
            path: "doctor",
            select: "name"
        });

    if (!appointment || !appointment.isActive) {
        throw new Error("Appointment not found.");
    }

    // Appointment must be confirmed
    if (appointment.status !== "Confirmed") {
        throw new Error(
            "Only confirmed appointments can be checked in."
        );
    }

    // Visit already exists?
    const existingVisit = await Visit.findOne({
        appointment: appointment._id
    });

    if (existingVisit) {
        throw new Error(
            "Patient has already been checked in."
        );
    }

    // Generate Visit ID
    const visitId = await generateVisitId();

    // Create Visit
    const visit = await Visit.create({

        visitId,

        appointment: appointment._id,

        patient: appointment.patient._id,

        doctor: appointment.doctor._id,

        checkedInAt: new Date()

    });

    // Update appointment
    appointment.status = "Checked In";

    await appointment.save();

    // Populate visit
    await visit.populate([
        {
            path: "patient",
            select: "patientId name phone"
        },
        {
            path: "doctor",
            select: "name"
        },
        {
            path: "appointment"
        }
    ]);

    return visitResponse(visit);

};

export const getTodaysVisitsService = async () => {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const visits = await Visit.find({

        createdAt: {
            $gte: start,
            $lte: end
        },

        isActive: true

    })
    .populate({
        path: "patient",
        select: "patientId name phone"
    })
    .populate({
        path: "doctor",
        select: "name"
    })
    .sort({
        checkedInAt: 1
    });

    return visits.map(visitResponse);

};

export const startVisitService = async (visitId) => {

    const visit = await Visit.findById(visitId)
        .populate({
            path: "patient",
            select: "patientId name phone"
        })
        .populate({
            path: "doctor",
            select: "name"
        })
        .populate("appointment");

    if (!visit || !visit.isActive) {
        throw new Error("Visit not found.");
    }

    if (visit.status !== "Waiting") {
        throw new Error("Visit has already started.");
    }

    visit.status = "In Progress";
    visit.startedAt = new Date();

    await visit.save();

    return visitResponse(visit);

};

export const completeVisitService = async (visitId, notes = "") => {

    const visit = await Visit.findById(visitId)
        .populate("appointment")
        .populate({
            path: "patient",
            select: "patientId name phone"
        })
        .populate({
            path: "doctor",
            select: "name"
        });

    if (!visit || !visit.isActive) {
        throw new Error("Visit not found.");
    }

    if (visit.status !== "In Progress") {
        throw new Error("Visit is not in progress.");
    }

    visit.status = "Completed";
    visit.completedAt = new Date();
    visit.notes = notes;

    await visit.save();

    visit.appointment.status = "Completed";

    await visit.appointment.save();

    return visitResponse(visit);

};

export const getVisitByIdService = async (visitId) => {

    const visit = await Visit.findById(visitId)
        .populate({
            path: "patient",
            select: "patientId name phone email"
        })
        .populate({
            path: "doctor",
            select: "name"
        })
        .populate("appointment");

    if (!visit || !visit.isActive) {
        throw new Error("Visit not found.");
    }

    return visitResponse(visit);

};

export const getWaitingVisitService = async (
    doctorId,
    patientKeyword
) => {

    const patient = await getPatientDocument(patientKeyword);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    const visit = await Visit.findOne({
        patient: patient._id,
        doctor: doctorId,
        status: "Waiting",
        isActive: true,
    })
    .populate({
        path: "patient",
        select: "patientId name phone",
    })
    .populate({
        path: "doctor",
        select: "name",
    })
    .populate("appointment");

    if (!visit) {
        throw new Error(
            "No waiting visit found for this patient."
        );
    }

    return visit;
};

export const getActiveVisitService = async (
    doctorId,
    patientKeyword
) => {

    const patient = await getPatientDocument(patientKeyword);

    if (!patient) {
        throw new Error("Patient not found.");
    }

    const visit = await Visit.findOne({
        patient: patient._id,
        doctor: doctorId,
        status: "In Progress",
        isActive: true,
    })
    .populate({
        path: "patient",
        select: "patientId name phone",
    })
    .populate({
        path: "doctor",
        select: "name",
    })
    .populate("appointment");

    if (!visit) {
        throw new Error(
            "No active visit found for this patient."
        );
    }

    return visit;
};

export const startVisitByPatientService = async (
    doctorId,
    patientKeyword
) => {

    const visit = await getWaitingVisitService(
        doctorId,
        patientKeyword
    );

    return await startVisitService(visit._id);

};

export const completeVisitByPatientService = async (
    doctorId,
    patientKeyword,
    notes = ""
) => {

    const visit = await getActiveVisitService(
        doctorId,
        patientKeyword
    );

    return await completeVisitService(
        visit._id,
        notes
    );

};