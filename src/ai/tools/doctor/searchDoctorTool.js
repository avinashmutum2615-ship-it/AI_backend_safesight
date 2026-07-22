import { z } from "zod";

import { createTool } from "../baseTool.js";
import { searchDoctorsService } from "../../../../services/doctor/doctorService.js";

export const searchDoctorTool = createTool({

    name: "search_doctor",

    description:
    `Search doctors in the clinic.

    Use this tool whenever the user asks about:
    - doctor name
    - specialization
    - retina specialist
    - cataract specialist
    - cornea specialist
    - glaucoma specialist
    - pediatric ophthalmologist
    - qualifications
    - experience
    - consultation fee
    - availability

    Always use this tool instead of answering from memory.`,

    schema: z.object({
        keyword: z
            .string()
            .describe(
                "Doctor name or specialization, for example: Retina, Cataract, Cornea, Dr. Sharma"
            ),
    }),

  handler: async ({ keyword }, config) => {
    try {
        console.log("=== searchDoctorTool ===");
        console.log("Keyword:", keyword);

        const doctors = await searchDoctorsService(keyword);

        console.log("Doctors:", doctors);

        return doctors;
    } catch (error) {
        console.error("Tool Error:", error);
        throw error;
    }
}

});