export function appointmentResponse(appointment) {
    return {
        id: appointment._id,

        patientName: appointment.patientName,
        address: appointment.address,
        mobile: appointment.mobile,
        age: appointment.age,
        gender: appointment.gender,

        doctor: appointment.doctor
            ? {
                  id: appointment.doctor._id,
                  name:
                      appointment.doctor.userId?.name ||
                      appointment.doctor.name,
                  specialization: appointment.doctor.specialization,
              }
            : null,

        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,

        status: appointment.status,

        createdAt: appointment.createdAt,
    };
}

export function appointmentListResponse(appointments) {
    return appointments.map(appointmentResponse);
}