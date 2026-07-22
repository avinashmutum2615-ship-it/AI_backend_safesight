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
import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

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

        const startTime = Date.now();

        try {

            logInfo("Update Appointment Tool Started", {
                patient: input.patient,
                doctor: input.doctor,
                currentAppointmentDate: input.currentAppointmentDate,
                newAppointmentDate: input.newAppointmentDate,
                newAppointmentTime: input.newAppointmentTime,
            });

            const user = config.configurable.user;

            if (!user) {
                throw new Error("User context is missing.");
            }

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

                let doctor = null;

                if (input.doctor) {

                    const doctors = await searchDoctorsService(input.doctor);

                if (input.doctor) {

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

                        logInfo("Available Slots", {
                            doctor: doctor?.name ?? appointment.doctor.name,
                            appointmentDate: newAppointmentDate,
                            availableSlots,
                        });

                        if (!availableSlots.includes(newAppointmentTime)) {
                            throw new Error(
                                `The slot ${newAppointmentTime} is not available.`
                            );
                        }

                    }

                    logInfo("Updating Appointment", {
                        patient: patient.name,
                        doctor: doctor?.name ?? appointment.doctor.name,
                        appointmentDate: newAppointmentDate,
                        appointmentTime: newAppointmentTime,
                    });

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

                    logSuccess("Appointment Updated", {
                        patient: patient.name,
                        doctor: doctor?.name ?? appointment.doctor.name,
                        appointmentDate: newAppointmentDate,
                        appointmentTime: newAppointmentTime,
                        executionTime: `${Date.now() - startTime} ms`,
                    });

                    return updatedAppointment;

                }
            } catch (error) {

                logError("Update Appointment Tool Error", error);

                throw error;

            }



   }   
    
});