import express from "express";

import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

import { getAvailableDoctors, updateAvailability } from "../controllers/doctorController.js";

const router = express.Router();

router.patch(
    "/availability",
    auth,
    authorize("doctor"),
    updateAvailability
);
router.get(
    "/available",
    auth,
    getAvailableDoctors
);

export default router;