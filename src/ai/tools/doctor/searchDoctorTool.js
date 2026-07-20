import { z } from "zod";

import { createTool } from "../baseTool.js";
import { searchDoctorsService } from "../../../../services/doctor/doctorService.js";

export const searchDoctorTool = createTool({

    name: "search_doctor",

    description:
        "Search doctors by name, specialization or branch.",

    schema: z.object({
        keyword: z.string(),
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