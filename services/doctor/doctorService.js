import Doctor from "../../models/Doctor.js";
import User from "../../models/User.js";
import { doctorListResponse } from "../../utils/dto/doctorListResponse.js";

export async function updateAvailabilityService(userId, status) {

    const doctor = await Doctor.findOne({
        userId,
    });

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    doctor.availability.status = status;
    doctor.availability.updatedAt = new Date();

    await doctor.save();

    return doctor;
}

export async function getAvailableDoctorsService() {

    const doctors = await Doctor.find({
        "availability.status": true,
    });

    const availableDoctors = [];

    for (const doctor of doctors) {

        const user = await User.findById(doctor.userId);

        if (!user) continue;

        availableDoctors.push(
            doctorListResponse(user, doctor)
        );

    }

    return availableDoctors;
}