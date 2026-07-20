import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchAppointmentsService,
} from "../../../../services/appointment/appointmentService.js";

const schema = z.object({});

export const todayAppointmentsTool = createTool({

    name: "today_appointments",

    description:
        "Get all appointments scheduled for today.",

    schema,

    handler: async () => {

        const today = new Date();

        const appointments =
            await searchAppointmentsService({

                appointmentDate: today,

            });

        return appointments;

    }

});