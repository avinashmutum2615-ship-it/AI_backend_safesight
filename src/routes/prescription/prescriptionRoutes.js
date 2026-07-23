import express from "express";

import {
    createPrescription,
    getPrescriptionById,
    getPrescriptionByVisit,
    updatePrescription,
    deletePrescription
} from "../../controllers/prescription/prescriptionController.js";

import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.use(auth);


router.post(
    "/",
    authorize("doctor", "admin"),
    createPrescription
);


router.get(
    "/visit/:visitId",
    authorize("doctor", "admin", "receptionist"),
    getPrescriptionByVisit
);


router.get(
    "/:id",
    authorize("doctor", "admin", "receptionist"),
    getPrescriptionById
);


router.patch(
    "/:id",
    authorize("doctor", "admin"),
    updatePrescription
);


router.delete(
    "/:id",
    authorize("admin"),
    deletePrescription
);

export default router;