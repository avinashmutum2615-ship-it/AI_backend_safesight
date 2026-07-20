import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchPatientsService,
} from "../../../../services/patient/patientService.js";

export const searchPatientTool = createTool({

    name: "search_patient",

    description:
        "Search patient using patient name, patient ID or phone number.",

    schema: z.object({

        keyword: z
            .string()
            .describe("Patient name, patient ID or phone number"),

    }),

    handler: async ({ keyword }) => {

    console.log("🔍 searchPatientTool called:", keyword);

    return await searchPatientsService(keyword);

},

});

