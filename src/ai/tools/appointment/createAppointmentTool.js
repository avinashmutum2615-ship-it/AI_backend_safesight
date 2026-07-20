import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    createAppointmentService,
} from "../../../../services/appointment/appointmentService.js";

import {
    searchPatientsService,
} from "../../../../services/patient/patientService.js";

import {
    searchDoctorsService,
} from "../../../../services/doctor/doctorService.js";

import {
    getAvailableSlotsService,
} from "../../../../services/appointment/appointmentService.js";


export const createAppointmentTool = createTool({

    name: "create_appointment",

    description:
        "Book an appointment for a patient with a doctor.",

    schema: z.object({

        patient: z.string(),

        doctor: z.string(),

        appointmentDate: z.string(),

        appointmentTime: z.string(),

        reason: z.string().optional(),

        notes: z.string().optional(),

    }),

    handler: async (input, config) => {

        // Find patient
        const patients = await searchPatientsService(input.patient);

        if (patients.length === 0) {
            throw new Error("Patient not found.");
        }

        if (patients.length > 1) {
            throw new Error("Multiple patients found. Please specify the patient.");
        }

        const patient = patients[0];

        // Find doctor
        const doctors = await searchDoctorsService(input.doctor);

        if (doctors.length === 0) {
            throw new Error("Doctor not found.");
        }

        if (doctors.length > 1) {
            throw new Error("Multiple doctors found. Please specify the doctor.");
        }

        const doctor = doctors[0];


        // Check available slots
        let availableSlots;

        try {

            availableSlots = await getAvailableSlotsService(
                doctor.id,
                input.appointmentDate
            );

            console.log("Available Slots:", availableSlots);

        } catch (error) {

            console.error("getAvailableSlotsService Error:");
            console.error(error);

            throw error;
        }

        if (!availableSlots.includes(input.appointmentTime)) {
            throw new Error(
                `The slot ${input.appointmentTime} is not available.`
            );
        }

        // Logged-in user
        const user = config.configurable.user;

        const appointment = await createAppointmentService(
            {
                patient: patient.id,
                doctor: doctor.id,
                appointmentDate: input.appointmentDate,
                appointmentTime: input.appointmentTime,
                reason: input.reason,
                notes: input.notes,
            },
            user.id
        );

        return appointment;

    }
});