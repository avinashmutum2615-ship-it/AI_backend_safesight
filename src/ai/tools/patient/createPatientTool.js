import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    createPatientService,
} from "../../../services/patient/patientService.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

export const createPatientTool = createTool({

    name: "create_patient",

    description:
        `Register a new patient in the clinic.

        Use this tool only after you have collected all required information:

        - name
        - gender
        - date of birth
        - phone number

        If any required field is missing, ask the user for it first.`,

    schema: z.object({

        name: z.string(),

        gender: z.string(),

        dateOfBirth: z.string(),

        phone: z.string(),

        email: z.string().optional(),

        address: z.string().optional(),

        bloodGroup: z.string().optional(),

        emergencyContact: z.string().optional(),

    }),

    handler: async (input) => {

        const startTime = Date.now();

        try {

            logInfo("Create Patient Tool", {
                name: input.name,
                phone: input.phone,
            });

            const patient = await createPatientService(input);

            logSuccess("Patient Created", {
                patientId: patient.patientId,
                name: patient.name,
                executionTime: `${Date.now() - startTime} ms`,
            });

            return patient;

        } catch (error) {

            logError("Create Patient Tool Error", error);

            throw error;

        }

    },

});