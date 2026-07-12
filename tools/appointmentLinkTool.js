import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAppointmentLink } from "../services/ai/appointmentAiService.js";

export const appointmentLinkTool = new DynamicStructuredTool({

    name: "get_appointment_link",

    description: `
Use this tool whenever the user wants to:

- Book an appointment
- Schedule an appointment
- Take an appointment
- Visit the clinic
- Meet a doctor
`,

    schema: z.object({}),

    func: async () => {

        const result = await getAppointmentLink();

        if (!result) {
            return "Appointment link not available.";
        }

        return JSON.stringify(result);
    }
});