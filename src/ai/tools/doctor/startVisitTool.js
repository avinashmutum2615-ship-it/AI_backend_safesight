import { z } from "zod";
import Doctor from "../../../models/Doctor.js";
import { createTool } from "../baseTool.js";
import { startVisitByPatientService } from "../../../services/visit/visitService.js";

export const startVisitTool = createTool({

    name: "start_visit",

    description:
        "Start consultation for a patient who has checked in and is waiting.",

    schema: z.object({

        patient: z
            .string()
            .describe("Patient name, patient ID, or phone number"),

    }),

    handler: async ({ patient }, config) => {

        const doctor = await Doctor.findOne({
            userId: config.configurable.user.id,
        });

        if (!doctor) {
            throw new Error("Doctor not found.");
        }

        return await startVisitByPatientService(
            doctor._id,
            patient
        );

    },

});