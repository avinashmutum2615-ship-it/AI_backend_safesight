import { z } from "zod";
import Doctor from "../../../../models/Doctor.js";
import { createTool } from "../baseTool.js";
import { createPrescriptionByPatientService } from "../../../../services/prescription/prescriptionService.js";

export const createPrescriptionTool = createTool({

    name: "create_prescription",

    description:
        "Create a prescription for a patient whose visit is currently in progress.",

    schema: z.object({

        patient: z
            .string()
            .describe("Patient name, patient ID, or phone number"),

        diagnosis: z.array(z.object({
            eye: z.enum([
                "Both Eyes",
                "Right Eye",
                "Left Eye",
                "Systemic"
            ]),
            disease: z.string(),
        })).optional(),

        clinicalComments: z.string().optional(),

        medications: z.array(z.object({

            eye: z.enum([
                "Both Eyes",
                "Right Eye",
                "Left Eye",
                "Systemic"
            ]).optional(),

            dosageForm: z.string().optional(),

            medicine: z.string(),

            dose: z.string().optional(),

            frequency: z.string().optional(),

            duration: z.string().optional(),

            remarks: z.string().optional(),

        })).optional(),

        glassPrescription: z.any().optional(),

        actionPlan: z.string().optional(),

        procedures: z.array(z.any()).optional(),

        investigations: z.array(z.any()).optional(),

        followUp: z.any().optional(),

        referrals: z.array(z.any()).optional(),

    }),

    handler: async (input, config) => {

        const doctor = await Doctor.findOne({
            userId: config.configurable.user.id,
        });

        if (!doctor) {
            throw new Error("Doctor not found.");
        }

        return await createPrescriptionByPatientService(
            doctor._id,
            input.patient,
            input
        );

    },

});