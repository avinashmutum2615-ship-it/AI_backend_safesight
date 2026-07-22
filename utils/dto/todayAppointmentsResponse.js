export function todayAppointmentsResponse(appointments) {

    return appointments.map((appointment) => ({

        id: appointment._id,

        patientId: appointment.patient.patientId,

        patient: appointment.patient.name,

        gender: appointment.patient.gender,

        time: appointment.appointmentTime,

        status: appointment.status,

        reason: appointment.reason,

    }));

}