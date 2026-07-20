import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { receptionistResponse } from "../../utils/dto/receptionistResponse.js";
import Appointment from "../../models/Appointment.js";

export const getDashboardService = async () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const appointments = await Appointment.find({
        appointmentDate: {
            $gte: today,
            $lt: tomorrow
        },
        isActive: true
    })
    .populate("patient")
    .populate({
        path: "doctor",
        populate: {
            path: "userId",
            select: "name"
        }
    });

    return {

        summary: {

            todayAppointments: appointments.length,

            confirmed: appointments.filter(
                a => a.status === "Confirmed"
            ).length,

            checkedIn: appointments.filter(
                a => a.status === "Checked In"
            ).length,

            completed: appointments.filter(
                a => a.status === "Completed"
            ).length

        },

        appointments

    };

};

export async function getReceptionistByIdService(id) {

    const receptionist = await User.findOne({
        _id: id,
        role: "receptionist"
    });

    if (!receptionist) {
        throw new Error("Receptionist not found.");
    }

    return receptionistResponse(receptionist);

}

export async function updateReceptionistService(id, data) {

    const receptionist = await User.findOne({
        _id: id,
        role: "receptionist"
    });

    if (!receptionist) {
        throw new Error("Receptionist not found.");
    }

    // Check duplicate email
    if (data.email && data.email !== receptionist.email) {

        const emailExists = await User.findOne({
            email: data.email
        });

        if (emailExists) {
            throw new Error("Email already exists.");
        }

    }

    // Check duplicate phone
    if (data.phone && data.phone !== receptionist.phone) {

        const phoneExists = await User.findOne({
            phone: data.phone
        });

        if (phoneExists) {
            throw new Error("Phone number already exists.");
        }

    }

    receptionist.name = data.name ?? receptionist.name;
    receptionist.email = data.email ?? receptionist.email;
    receptionist.phone = data.phone ?? receptionist.phone;

    // Update password only if provided
    if (data.password?.trim()) {

        receptionist.password = await bcrypt.hash(
            data.password,
            10
        );

    }

    await receptionist.save();

    return receptionistResponse(receptionist);

}

export async function deleteReceptionistService(id) {

    const receptionist = await User.findOne({
        _id: id,
        role: "receptionist"
    });

    if (!receptionist) {
        throw new Error("Receptionist not found.");
    }

    await User.findByIdAndDelete(id);

}