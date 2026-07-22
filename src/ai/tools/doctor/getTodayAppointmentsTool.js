import { z } from "zod";
import { createTool } from "../baseTool.js";

import {
    getTodayAppointmentsService,
} from "../../../../services/appointment/appointmentService.js";

import {
    todayAppointmentsResponse,
} from "../../../../utils/dto/todayAppointmentsResponse.js";

import Doctor from "../../../../models/Doctor.js";

export const getTodayAppointmentsTool = createTool({

    name: "get_today_appointments",

    description:
        "Get today's appointments for the logged-in doctor.",

    schema: z.object({}),

    handler: async (_, config) => {

        const doctor = await Doctor.findOne({
            userId: config.configurable.user.id,
        });

        if (!doctor) {
            throw new Error("Doctor not found.");
        }

        const appointments =
            await getTodayAppointmentsService(
                doctor._id
            );

        return todayAppointmentsResponse(
            appointments
        );

    },

});