import { z } from "zod";

import { createTool } from "../baseTool.js";
import { getAvailableSlotsService } from "../../../services/appointment/appointmentService.js";
import { searchDoctorsService } from "../../../services/doctor/doctorService.js";
import {
    logInfo,
    logSuccess,
    logError,
} from "../../../../utils/logger.js";

export const getAvailableSlotsTool = createTool({

    name: "get_available_slots",

    description:
        "Find available appointment slots for a doctor by doctor name and appointment date.",

    schema: z.object({

        doctor: z
            .string()
            .describe("Doctor name"),

        date: z
            .string()
            .describe("Appointment date in YYYY-MM-DD format")

    }),

   handler: async ({ doctor, date }) => {

    const startTime = Date.now();

    try {

        logInfo("Get Available Slots Tool Started", {
            doctor,
            appointmentDate: date,
        });

    const doctors = await searchDoctorsService(doctor);

    if (doctors.length > 1) {
        throw new Error(
            "Multiple doctors found. Please specify the doctor."
        );
    }
    if (doctors.length === 0) {
        throw new Error(
            `No doctor found matching "${doctor}".`
        );
    }

    const selectedDoctor = doctors[0];

    const slots = await getAvailableSlotsService(
        selectedDoctor.id,
        date
    );

    logSuccess("Available Slots Retrieved", {
        doctor: selectedDoctor.name,
        appointmentDate: date,
        totalSlots: slots.length,
        executionTime: `${Date.now() - startTime} ms`,
    });

        return {
            doctor: {
                id: selectedDoctor.id,
                name: selectedDoctor.name,
                specialization: selectedDoctor.specialization,
            },
            date,
            availableSlots: slots,
        };

        } catch (error) {

                logError("Get Available Slots Tool Error", error);

                throw error;

            }

    }

});