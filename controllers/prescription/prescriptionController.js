import {

    createPrescriptionService,
    getPrescriptionByIdService,
    getPrescriptionByVisitService,
    updatePrescriptionService,
    deletePrescriptionService

} from "../../services/prescription/prescriptionService.js";

export async function createPrescription(req, res) {

    try {

        const prescription = await createPrescriptionService(req.body);

        return res.status(201).json({

            success: true,
            message: "Prescription created successfully.",

            prescription

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}

export async function getPrescriptionById(req, res) {

    try {

        const prescription = await getPrescriptionByIdService(req.params.id);

        return res.status(200).json({

            success: true,

            prescription

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message

        });

    }

}

export async function getPrescriptionByVisit(req, res) {

    try {

        const prescription = await getPrescriptionByVisitService(req.params.visitId);

        return res.status(200).json({

            success: true,

            prescription

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message

        });

    }

}

export async function updatePrescription(req, res) {

    try {

        const prescription = await updatePrescriptionService(

            req.params.id,

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Prescription updated successfully.",

            prescription

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}

export async function deletePrescription(req, res) {

    try {

        await deletePrescriptionService(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Prescription deleted successfully."

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message

        });

    }

}