export function dashboardResponse(data) {

    return {
        todayAppointments: data.todayAppointments,
        booked: data.booked,
        completed: data.completed,
        cancelled: data.cancelled,
        availableDoctors: data.availableDoctors,
    };

}