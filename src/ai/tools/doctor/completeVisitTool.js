import { z } from "zod";

import { createTool } from "../baseTool.js";
import Doctor from "../../../models/Doctor.js";
import { completeVisitByPatientService } from "../../../services/visit/visitService.js";

export const completeVisitTool = createTool({

    name: "complete_visit",

    description:
        "Complete the current consultation for a patient after examination and prescription.",

    schema: z.object({

        patient: z
            .string()
            .min(1)
            .describe("Patient name, patient ID, or phone number."),

        notes: z
            .string()
            .optional()
            .describe("Optional completion notes for the visit."),

    }),

    handler: async (input, config) => {

        const user = config.configurable?.user;

        if (!user?.id) {
            throw new Error("Doctor authentication required.");
        }

        const doctor = await Doctor.findOne({
            userId: user.id,
        });

        if (!doctor) {
            throw new Error("Doctor profile not found.");
        }

        return await completeVisitByPatientService(
            doctor._id,
            input.patient,
            input.notes
        );

    },

});
