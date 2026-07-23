import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    createAppointmentService,
    getAvailableSlotsService,
} from "../../../services/appointment/appointmentService.js";

import {
    searchPatientsService,
} from "../../../services/patient/patientService.js";

import {
    searchDoctorsService,
} from "../../../services/doctor/doctorService.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

export const createAppointmentTool = createTool({

    name: "create_appointment",

    description: `
    Book an appointment for a patient.

    Use this tool only after you have collected:

    - patient name
    - doctor name
    - appointment date
    - appointment time

    Rules:
    - Convert relative dates like "today", "tomorrow", and "next Monday" into YYYY-MM-DD before calling this tool.
    - If any required information is missing, ask the user for it.
    - Once all required information is available, call this tool immediately.
    `,

    schema: z.object({

        patient: z.string(),

        doctor: z.string(),

        appointmentDate: z.string(),

        appointmentTime: z.string(),

        reason: z.string().optional(),

        notes: z.string().optional(),

    }),

    handler: async (input, config) => {

        const startTime = Date.now();

        try {

            logInfo("Create Appointment Tool Started", {
                patient: input.patient,
                doctor: input.doctor,
                appointmentDate: input.appointmentDate,
                appointmentTime: input.appointmentTime,
            });

            // -----------------------------
            // Find Patient
            // -----------------------------
            const patients = await searchPatientsService(input.patient);

            if (patients.length === 0) {
                throw new Error(
                    `No patient found matching "${input.patient}".`
                );
            }

            if (patients.length > 1) {
                throw new Error(
                    "Multiple patients found. Please specify the patient."
                );
            }

            const patient = patients[0];

            // -----------------------------
            // Find Doctor
            // -----------------------------
            const doctors = await searchDoctorsService(input.doctor);

            if (doctors.length === 0) {
                throw new Error(
                    `No doctor found matching "${input.doctor}".`
                );
            }

            if (doctors.length > 1) {
                throw new Error(
                    "Multiple doctors found. Please specify the doctor."
                );
            }

            const doctor = doctors[0];

            // -----------------------------
            // Available Slots
            // -----------------------------
            const availableSlots =
                await getAvailableSlotsService(
                    doctor.id,
                    input.appointmentDate
                );

            logInfo("Available Slots", {
                doctor: doctor.name,
                appointmentDate: input.appointmentDate,
                availableSlots,
            });

            if (!availableSlots.includes(input.appointmentTime)) {

                throw new Error(
                    `The slot ${input.appointmentTime} is not available.`
                );

            }

            // -----------------------------
            // Logged-in User
            // -----------------------------
            const user = config.configurable.user;

            if (!user) {
                throw new Error("User context is missing.");
            }

            logInfo("Creating Appointment", {
                patient: patient.name,
                doctor: doctor.name,
                appointmentDate: input.appointmentDate,
                appointmentTime: input.appointmentTime,
            });

            // -----------------------------
            // Create Appointment
            // -----------------------------
            const appointment =
                await createAppointmentService(
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

            logSuccess("Appointment Created Successfully", {
                patient: patient.name,
                doctor: doctor.name,
                appointmentDate: input.appointmentDate,
                appointmentTime: input.appointmentTime,
                executionTime: `${Date.now() - startTime} ms`,
            });

            return appointment;

        } catch (error) {

            logError("Create Appointment Tool Error", error);

            throw error;

        }

    },

});