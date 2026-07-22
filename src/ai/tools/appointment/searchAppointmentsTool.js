import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchPatientsService,
} from "../../../../services/patient/patientService.js";

import {
    searchDoctorsService,
} from "../../../../services/doctor/doctorService.js";

import {
    searchAppointmentsService,
} from "../../../../services/appointment/appointmentService.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

const schema = z.object({

    patient: z.string().optional(),

    doctor: z.string().optional(),

    appointmentDate: z.string().optional(),

    status: z.string().optional(),

});

export const searchAppointmentsTool = createTool({

    name: "search_appointments",

    description:
        "Search appointments by patient, doctor, date or status.",

    schema,

    handler: async (input) => {

        const startTime = Date.now();

        try {

        

            logInfo("Search Appointments Tool Started", {
                patient: input.patient,
                doctor: input.doctor,
                appointmentDate: input.appointmentDate,
                status: input.status,
            });

            let patientId;
        let doctorId;

        if (input.patient) {

            const patients =
                await searchPatientsService(input.patient);

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

            patientId = patients[0].id;

        }

        if (input.doctor) {

            const doctors =
                await searchDoctorsService(input.doctor);

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

            doctorId = doctors[0].id;

        }

        const appointments =
            await searchAppointmentsService({

                patientId,

                doctorId,

                appointmentDate: input.appointmentDate,

                status: input.status,

            });

            logSuccess("Appointments Found", {
                results: appointments.length,
                patient: input.patient,
                doctor: input.doctor,
                appointmentDate: input.appointmentDate,
                status: input.status,
                executionTime: `${Date.now() - startTime} ms`,
            });

        return appointments;
         } catch (error) {

                logError("Search Appointment Tool Error", error);

                throw error;

            }

    }

});