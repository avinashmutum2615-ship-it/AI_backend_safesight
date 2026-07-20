import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchPatientsService
} from "../../../../services/patient/patientService.js";

import {
    searchDoctorsService
} from "../../../../services/doctor/doctorService.js";

import {
    getAppointmentService,
    cancelAppointmentService
} from "../../../../services/appointment/appointmentService.js";

const schema = z.object({

    patient: z.string(),

    appointmentDate: z.string(),

    doctor: z.string().optional()

});

export const cancelAppointmentTool = createTool({

    name: "cancel_appointment",

    description:
        "Cancel an existing appointment.",

    schema,

    handler: async (input, config) => {

        const user = config.configurable.user;

        if (!user) {
            throw new Error("User context is missing.");
        }

        const patients = await searchPatientsService(input.patient);

        if (patients.length === 0) {
            throw new Error("Patient not found.");
        }

        const patient = patients[0];

        let doctor = null;

        if (input.doctor) {

            const doctors = await searchDoctorsService(input.doctor);

            if (doctors.length === 0) {
                throw new Error("Doctor not found.");
            }

            doctor = doctors[0];

        }

        const appointment = await getAppointmentService({

            patientId: patient.id,

            doctorId: doctor?.id,

            appointmentDate: input.appointmentDate,

        });

        const cancelledAppointment =
            await cancelAppointmentService(
                appointment._id,
                user.id
            );

        return cancelledAppointment;

    }

});