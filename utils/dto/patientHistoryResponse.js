export function patientHistoryResponse(patient, appointments) {

    return {
        patient: {
            id: patient.patientId,
            name: patient.name,
            gender: patient.gender,
            dateOfBirth: patient.dateOfBirth,
            phone: patient.phone,
            email: patient.email,
            address: patient.address,
            bloodGroup: patient.bloodGroup,
        },

        summary: {
            totalVisits: appointments.length,
            lastVisit:
                appointments.length > 0
                    ? appointments[0].appointmentDate
                    : null,
        },

        appointments: appointments.map((appointment) => ({

            id: appointment._id,

            date: appointment.appointmentDate,

            time: appointment.appointmentTime,

            status: appointment.status,

            reason: appointment.reason,

            notes: appointment.notes,

            doctor:
                appointment.doctor?.userId?.name ??
                "Unknown",

        })),
    };

}