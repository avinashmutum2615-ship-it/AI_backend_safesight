import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchPatientsService,
} from "../../../services/patient/patientService.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

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

        const startTime = Date.now();

        try {

            logInfo("Search Patient Tool", {
                keyword,
            });

            const patients = await searchPatientsService(keyword);

            logSuccess("Search Patient Completed", {
                keyword,
                results: patients.length,
                patientIds: patients.map(patient => patient.patientId),
                executionTime: `${Date.now() - startTime} ms`,
            });

            return patients;

        } catch (error) {

            logError("Search Patient Tool Error", error);

            throw error;

        }

    },

});