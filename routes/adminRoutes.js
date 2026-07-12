import express from "express";

import { createDoctor, createReceptionist, getAllStaff, getDashboard } from "../controllers/adminController.js";

import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/doctors/new",
    auth,
    authorize("admin"),
    createDoctor
);
router.post(
    "/receptionists/new",
    auth,
    authorize("admin"),
    createReceptionist
);
router.get(
    "/staff",
    auth,
    authorize("admin"),
    getAllStaff
);
router.get(
    "/dashboard",
    auth,
    authorize("admin"),
    getDashboard
);

export default router;