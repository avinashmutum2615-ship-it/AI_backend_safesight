import { z } from "zod";

import { createTool } from "../baseTool.js";

import {
    searchAppointmentsService,
} from "../../../../services/appointment/appointmentService.js";

import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

const schema = z.object({});

export const todayAppointmentsTool = createTool({

    name: "today_appointments",

    description:
        "Get all appointments scheduled for today.",

    schema,

    handler: async () => {

    const startTime = Date.now();

    try {

        logInfo("Today's Appointments Tool Started");

        const today = new Date().toISOString().split("T")[0];

        const appointments =
            await searchAppointmentsService({
                appointmentDate: today,
            });

        logSuccess("Today's Appointments Retrieved", {
            totalAppointments: appointments.length,
            appointmentDate: today,
            executionTime: `${Date.now() - startTime} ms`,
        });

        return appointments;

    } catch (error) {

        logError("Today Appointments Tool Error", error);

        throw error;

    }

}

});