import express from "express";

import { createPatient } from "../controllers/patientController.js";

import  { auth}  from "../middleware/auth.js";

import { authorize}  from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    auth,
    authorize("admin", "receptionist"),
    createPatient
);

export default router;