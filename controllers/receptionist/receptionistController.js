import {
    getReceptionistByIdService,
    updateReceptionistService,
    deleteReceptionistService,
    getDashboardService
} from "../../services/receptionist/receptionistService.js";

export async function getReceptionistById(req, res) {

    try {

        const receptionist = await getReceptionistByIdService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            receptionist,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

}

export async function updateReceptionist(req, res) {

    try {

        const receptionist = await updateReceptionistService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Receptionist updated successfully.",
            receptionist,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

export async function deleteReceptionist(req, res) {

    try {

        await deleteReceptionistService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Receptionist deleted successfully.",
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

export const getDashboard = async (req, res) => {

    try {

        const dashboard = await getDashboardService();

        res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};