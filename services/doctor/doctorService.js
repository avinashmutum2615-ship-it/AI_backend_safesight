import Doctor from "../../models/Doctor.js";
import User from "../../models/User.js";
import { doctorListResponse } from "../../utils/dto/doctorListResponse.js";
import { doctorResponse } from "../../utils/dto/doctorResponse.js";

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

export async function getDoctorByIdService(id) {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    const user = await User.findById(doctor.userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return doctorResponse(user, doctor);

}

export async function updateDoctorService(id, data) {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    const user = await User.findById(doctor.userId);

    if (!user) {
        throw new Error("User not found.");
    }

    // Check duplicate email
    if (data.email && data.email !== user.email) {

        const emailExists = await User.findOne({
            email: data.email,
            _id: { $ne: user._id }
        });

        if (emailExists) {
            throw new Error("Email already exists.");
        }

    }

    // Check duplicate phone
    if (data.phone && data.phone !== user.phone) {

        const phoneExists = await User.findOne({
            phone: data.phone,
            _id: { $ne: user._id }
        });

        if (phoneExists) {
            throw new Error("Phone number already exists.");
        }

    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.phone = data.phone ?? user.phone;

    doctor.specialization =
        data.specialization ?? doctor.specialization;

    doctor.qualification =
        data.qualification ?? doctor.qualification;

    doctor.experience =
        data.experience ?? doctor.experience;

    doctor.consultationFee =
        data.consultationFee ?? doctor.consultationFee;

    await user.save();
    await doctor.save();

    return doctorResponse(user, doctor);

}

export async function deleteDoctorService(id) {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("Doctor not found.");
    }

    await User.findByIdAndDelete(doctor.userId);

    await Doctor.findByIdAndDelete(id);

}

export async function searchDoctorsService(keyword) {

    const doctors = await Doctor.find({
        specialization: {
            $regex: keyword,
            $options: "i",
        },
    }).populate("userId");

    const nameDoctors = await Doctor.find()
        .populate({
            path: "userId",
            match: {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        });

    const results = [];

    const added = new Set();

    [...doctors, ...nameDoctors].forEach((doctor) => {

        if (!doctor.userId) return;

        if (added.has(doctor._id.toString())) return;

        added.add(doctor._id.toString());

        results.push(
            doctorListResponse(
                doctor.userId,
                doctor
            )
        );

    });

    return results;
}