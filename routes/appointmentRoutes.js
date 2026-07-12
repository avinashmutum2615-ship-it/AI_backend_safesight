import express from "express";

import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

import {
    createAppointment,
    deleteAppointment,
    getAppointmentById,
    getDashboard,
    getTodayAppointments,
    searchAppointments,
    updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post(
    "/",
    auth,
    authorize("admin", "receptionist"),
    createAppointment
);

router.get(
    "/dashboard",
    auth,
    authorize("admin", "receptionist"),
    getDashboard
);

router.get(
    "/today",
    auth,
    authorize("admin", "receptionist", "doctor"),
    getTodayAppointments
);

router.get(
    "/search",
    auth,
    authorize("admin", "receptionist", "doctor"),
    searchAppointments
);

// Keep parameterized routes at the end
router.get(
    "/:id",
    auth,
    authorize("admin", "doctor", "receptionist"),
    getAppointmentById
);

router.patch(
    "/:id/status",
    auth,
    authorize("admin", "doctor", "receptionist"),
    updateAppointmentStatus
);

router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteAppointment
);

export default router;