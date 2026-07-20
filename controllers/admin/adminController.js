import { createDoctorService, createReceptionistService, getAllStaffService, getDashboardService } from "../../services/admin/adminService.js";

export async function createDoctor(req, res) {
    try {

        const doctor = await createDoctorService(req.body);

        res.status(201).json({
            success: true,
            message: "Doctor created successfully.",
            doctor,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function createReceptionist(req, res) {
    try {

        const receptionist =
            await createReceptionistService(req.body);

        res.status(201).json({
            success: true,
            message: "Receptionist created successfully.",
            receptionist,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export async function getAllStaff(req, res) {
    try {

        const staff = await getAllStaffService();

        res.status(200).json({
            success: true,
            total: staff.length,
            staff,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

export async function getDashboard(req, res) {

    try {

        const dashboard = await getDashboardService();

        res.status(200).json({
            success: true,
            dashboard,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}
