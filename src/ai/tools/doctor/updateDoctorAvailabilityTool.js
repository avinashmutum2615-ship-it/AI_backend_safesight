import { z } from "zod";
import { createTool } from "../baseTool.js";

import {
    updateDoctorAvailabilityService,
} from "../../../../services/doctor/doctorService.js";

export const updateDoctorAvailabilityTool =
createTool({

    name: "update_doctor_availability",

    description:
        "Update the logged-in doctor's availability.",

    schema: z.object({

        status: z.boolean().optional(),

        workingDays:
            z.array(z.number()).optional(),

        startTime:
            z.string().optional(),

        endTime:
            z.string().optional(),

        slotDuration:
            z.number().optional(),

        breaks: z.array(

            z.object({

                start: z.string(),

                end: z.string(),

            })

        ).optional(),

    }),

    handler: async (input, config) => {

        return await updateDoctorAvailabilityService(

            config.configurable.user.id,

            input

        );

    },

});