import { z } from "zod";

import { createTool } from "../baseTool.js";
import { getAvailableSlotsService } from "../../../../services/appointment/appointmentService.js";
import { searchDoctorsService } from "../../../../services/doctor/doctorService.js";

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

    const doctors = await searchDoctorsService(doctor);

    if (doctors.length === 0) {
        throw new Error("Doctor not found.");
    }

    const selectedDoctor = doctors[0];

    const slots = await getAvailableSlotsService(
        selectedDoctor.id,
        date
    );

        return {
            doctor: {
                id: selectedDoctor.id,
                name: selectedDoctor.name,
                specialization: selectedDoctor.specialization,
            },
            date,
            availableSlots: slots,
        };

    }

});