import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    createPatientService,
} from "../../../../services/patient/patientService.js";

export const createPatientTool = createTool({

    name: "create_patient",

    description:
        "Register a new patient in the clinic.",

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

        return await createPatientService(input);

    },

});