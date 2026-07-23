import express from "express";

import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    searchAppointments,
    getAvailableSlots,
    getDashboard
} from "../../controllers/appointment/appointmentController.js";

import { checkInAppointment } from "../../controllers//visit/visitController.js";

import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.use(auth);

router.post(
    "/",
    authorize("admin", "receptionist"),
    createAppointment
);

router.get("/", getAllAppointments);

router.get("/search", searchAppointments);

router.get("/available-slots", getAvailableSlots);

router.post(
    "/:id/check-in",
    authorize("admin", "receptionist"),
    checkInAppointment
);

router.get("/dashboard", getDashboard);

router.get("/:id", getAppointmentById);

router.patch(
    "/:id",
    authorize("admin", "receptionist"),
    updateAppointment
);

router.delete(
    "/:id",
    authorize("admin"),
    deleteAppointment
);

export default router;