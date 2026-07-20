import express from "express";

import {
    createPatient,
    getAllPatients,
    getPatientById,
    searchPatients,
    updatePatient,
    deletePatient,
} from "../../controllers/patient/patientController.js";

import { auth } from "../../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.post("/", createPatient);

router.get("/", getAllPatients);

router.get("/search", searchPatients);

router.get("/:id", getPatientById);

router.patch("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;