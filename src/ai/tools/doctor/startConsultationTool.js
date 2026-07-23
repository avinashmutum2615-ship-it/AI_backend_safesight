import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

import Doctor from "../../../models/Doctor.js";
import { startConsultationService } from "../../../services/appointment/appointmentService.js";

export const startConsultationTool = new DynamicStructuredTool({
    name: "start_consultation",

    description:
        "Start today's consultation for a patient by patient name, patient ID, or phone number.",

    schema: z.object({
        patient: z.string().describe(
            "Patient name, patient ID, or phone number"
        ),
    }),

    func: async (input, config) => {
        try {
            const doctor = await Doctor.findOne({
                userId: config.configurable.user.id,
            });

            if (!doctor) {
                throw new Error("Doctor profile not found.");
            }

            const appointment = await startConsultationService(
                doctor._id,
                input.patient
            );

            return JSON.stringify({
                success: true,
                data: {
                    appointmentId: appointment._id,
                    patient: input.patient,
                    status: appointment.status,
                },
            });
        } catch (error) {
            return JSON.stringify({
                success: false,
                message: error.message,
            });
        }
    },
});