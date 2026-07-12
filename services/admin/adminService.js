import mongoose from "mongoose";
import User from "../../models/User.js";
import Doctor from "../../models/Doctor.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { userResponse } from "../../utils/dto/userResponse.js";
import { doctorResponse } from "../../utils/dto/doctorResponse.js";

export async function createDoctorService(data) {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const existingUser = await User.findOne({
            email: data.email,
        }).session(session);

        if (existingUser) {
            throw new Error("Email already exists.");
        }

        const hashedPassword = await hashPassword(data.password);

        const user = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            role: "doctor",
        });

        await user.save({ session });

        const doctor = new Doctor({
            userId: user._id,
            specialization: data.specialization,
            qualification: data.qualification,
            experience: data.experience,
            consultationFee: data.consultationFee,
            available: true,
        });

        await doctor.save({ session });

        await session.commitTransaction();

        return doctorResponse(user, doctor);

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }
}

export async function createReceptionistService(data) {

    const existingUser = await User.findOne({
        email: data.email,
    });

    if (existingUser) {
        throw new Error("Email already exists.");
    }

    const hashedPassword = await hashPassword(data.password);

    const receptionist = await User.create({

        name: data.name,

        email: data.email,

        phone: data.phone,

        password: hashedPassword,

        role: "receptionist",

    });

   return userResponse(receptionist);
}

export async function getAllStaffService() {

    const users = await User.find().sort({ createdAt: -1 });

    const staff = [];

    for (const user of users) {

        if (user.role === "doctor") {

            const doctor = await Doctor.findOne({
                userId: user._id,
            });

            staff.push(
                doctorResponse(user, doctor)
            );

        } else {

            staff.push(
                userResponse(user)
            );

        }

    }

    return staff;
}

export async function getDashboardService() {

    const totalStaff = await User.countDocuments();

    const totalDoctors = await User.countDocuments({
        role: "doctor",
    });

    const totalReceptionists = await User.countDocuments({
        role: "receptionist",
    });

    const totalAdmins = await User.countDocuments({
        role: "admin",
    });

    const activeStaff = await User.countDocuments({
        isActive: true,
    });

    const inactiveStaff = await User.countDocuments({
        isActive: false,
    });

    return {
        totalStaff,
        totalDoctors,
        totalReceptionists,
        totalAdmins,
        activeStaff,
        inactiveStaff,
    };

}