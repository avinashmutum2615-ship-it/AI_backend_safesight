import { updateAvailabilityService, getAvailableDoctorsService } from "../services/doctor/doctorService.js";

export async function updateAvailability(req, res) {

    try {

        const { status } = req.body;

        const doctor = await updateAvailabilityService(
            req.user.id,
            status
        );

        res.status(200).json({
            success: true,
            message: "Availability updated successfully.",
            availability: doctor.availability,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

export async function getAvailableDoctors(req, res) {



    try {

        const doctors = await getAvailableDoctorsService();

        res.status(200).json({
            success: true,
            total: doctors.length,
            doctors,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}