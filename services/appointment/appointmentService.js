import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import { appointmentResponse } from "../../utils/dto/appointmentResponse.js";

export async function createAppointmentService(data, userId) {

    const doctor = await Doctor.findById(data.doctor);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    if (!doctor.availability.status) {
        throw new Error("Doctor is unavailable.");
    }

    const appointment = await Appointment.create({

        patientName: data.patientName,

        address: data.address,

        mobile: data.mobile,

        age: data.age,

        gender: data.gender,

        doctor: doctor._id,

        appointmentDate: data.appointmentDate,

        appointmentTime: data.appointmentTime,

        createdBy: userId,

    });

    return appointment;

}

export async function getTodayAppointmentsService() {

    const today = new Date();

    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
        appointmentDate: {
            $gte: start,
            $lte: end,
        },
    })
    .populate({
        path: "doctor",
        populate: {
            path: "userId",
            select: "name",
        },
    })
    .sort({
        appointmentTime: 1,
    });

    return appointments;
}

export async function searchAppointmentsService(query) {

    const filter = {};

    if (query.mobile) {
        filter.mobile = query.mobile;
    }

    if (query.patientName) {
        filter.patientName = {
            $regex: query.patientName,
            $options: "i",
        };
    }

    const appointments = await Appointment.find(filter)
        .populate({
            path: "doctor",
            populate: {
                path: "userId",
                select: "name",
            },
        })
        .sort({
            appointmentDate: -1,
        });

    return appointments;
}

export async function getAppointmentByIdService(id) {

    const appointment = await Appointment.findById(id)
        .populate({
            path: "doctor",
            populate: {
                path: "userId",
                select: "name email phone",
            },
        });

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    return appointment;
}

export async function updateAppointmentStatusService(id, status) {

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    appointment.status = status;

    await appointment.save();

    return appointment;
}

export async function deleteAppointmentService(id) {

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
        throw new Error("Appointment not found.");
    }

    return appointment;
}

export async function getDashboardService() {

    const today = new Date();

    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.countDocuments({
        appointmentDate: {
            $gte: start,
            $lte: end,
        },
    });

    const booked = await Appointment.countDocuments({
        status: "booked",
    });

    const completed = await Appointment.countDocuments({
        status: "completed",
    });

    const cancelled = await Appointment.countDocuments({
        status: "cancelled",
    });

    const availableDoctors = await Doctor.countDocuments({
        "availability.status": true,
    });

    return {
        todayAppointments,
        booked,
        completed,
        cancelled,
        availableDoctors,
    };

}