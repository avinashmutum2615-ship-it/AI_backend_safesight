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
    getAvailableSlotsService,
    updateAppointmentService
} from "../../../../services/appointment/appointmentService.js";

const schema = z.object({

    patient: z.string(),

    currentAppointmentDate: z.string(),

    newAppointmentDate: z.string().optional(),

    newAppointmentTime: z.string().optional(),

    doctor: z.string().optional(),

    reason: z.string().optional(),

    notes: z.string().optional(),

    status: z.string().optional()

});


export const updateAppointmentTool = createTool({

    name: "update_appointment",

    description: "Update or reschedule an existing appointment.",

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
            appointmentDate: input.currentAppointmentDate,
        });

        const newDoctorId =
            doctor?.id || appointment.doctor._id.toString();

        const newAppointmentDate =
            input.newAppointmentDate || appointment.appointmentDate;

        const newAppointmentTime =
            input.newAppointmentTime || appointment.appointmentTime;

        if (
            input.newAppointmentDate ||
            input.newAppointmentTime ||
            input.doctor
        ) {

            const availableSlots = await getAvailableSlotsService(
                newDoctorId,
                newAppointmentDate,
                appointment._id
            );

            if (!availableSlots.includes(newAppointmentTime)) {
                throw new Error(
                    `The slot ${newAppointmentTime} is not available.`
                );
            }

        }

        const updatedAppointment =
            await updateAppointmentService(
                appointment._id,
                {
                    doctor: newDoctorId,
                    appointmentDate: newAppointmentDate,
                    appointmentTime: newAppointmentTime,
                    reason: input.reason,
                    notes: input.notes,
                    status: input.status,
                },
                user.id
            );

        return updatedAppointment;

    }

});