import { z } from "zod";
import { createTool } from "../baseTool.js";

import {
    getPatientHistoryService,
} from "../../../../services/patient/patientService.js";

export const getPatientHistoryTool = createTool({

    name: "get_patient_history",

    description:
        "Retrieve a patient's complete appointment history using patient ID, name, or phone number.",

    schema: z.object({

        patient: z.string(),

    }),

    handler: async ({ patient }) => {

        return await getPatientHistoryService(patient);

    },

});