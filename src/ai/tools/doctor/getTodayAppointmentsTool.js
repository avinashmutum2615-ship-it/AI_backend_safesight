import { z } from "zod";
import { createTool } from "../baseTool.js";

import {
    getTodayAppointmentsService,
} from "../../../services/appointment/appointmentService.js";

import {
    todayAppointmentsResponse,
} from "../../../../utils/dto/todayAppointmentsResponse.js";

import Doctor from "../../../models/Doctor.js";
import { getRuntimeContext } from "../../context/runtimeContext.js";

export const getTodayAppointmentsTool = createTool({

    name: "get_today_appointments",

    description:
        "Get today's appointments for the logged-in doctor.",

    schema: z.object({}),

    handler: async () => {

    const context = getRuntimeContext();

    if (!context?.user) {
        throw new Error("Request context is missing.");
    }

    const { user } = context;

    const doctor = await Doctor.findOne({
        userId: user.id,
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

}

});