import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

import Doctor from "../../../../models/Doctor.js";
import { saveExaminationService } from "../../../../services/examination/examinationService.js";

export const saveExaminationTool = new DynamicStructuredTool({
    name: "save_examination",

    description:
        "Save or update the examination findings of a patient whose consultation is currently in progress.",

    schema: z.object({
        patient: z
            .string()
            .describe("Patient name, patient ID, or phone number"),

        chiefComplaint: z.string().optional(),

        visualAcuity: z.object({
            right: z.string().optional(),
            left: z.string().optional(),
        }).optional(),

        intraocularPressure: z.object({
            right: z.string().optional(),
            left: z.string().optional(),
        }).optional(),

        slitLamp: z.object({
            right: z.string().optional(),
            left: z.string().optional(),
        }).optional(),

        fundus: z.object({
            right: z.string().optional(),
            left: z.string().optional(),
        }).optional(),

        diagnosis: z.string().optional(),

        notes: z.string().optional(),
    }),

    func: async (input, config) => {

        try {

            const doctor = await Doctor.findOne({
                userId: config.configurable.user.id,
            });

            if (!doctor) {
                throw new Error("Doctor profile not found.");
            }

            const examination = await saveExaminationService(
                doctor._id,
                input.patient,
                input
            );

            return JSON.stringify({
                success: true,
                data: {
                    examinationId: examination._id,
                    patient: input.patient,
                    message: "Examination saved successfully.",
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