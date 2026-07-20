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

        let patientId;
        let doctorId;

        if (input.patient) {

            const patients =
                await searchPatientsService(input.patient);

            if (patients.length === 0) {
                throw new Error("Patient not found.");
            }

            patientId = patients[0].id;

        }

        if (input.doctor) {

            const doctors =
                await searchDoctorsService(input.doctor);

            if (doctors.length === 0) {
                throw new Error("Doctor not found.");
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

        return appointments;

    }

});