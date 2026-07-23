import express from "express";

import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";

import {
    getReceptionistById,
    updateReceptionist,
    deleteReceptionist,
    getDashboard,
} from "../../controllers/receptionist/receptionistController.js";

const router = express.Router();

router.get(
    "/dashboard",
    auth,
    authorize("receptionist"),
    getDashboard
);

router.get(
    "/:id",
    auth,
    authorize("admin"),
    getReceptionistById
);

router.patch(
    "/:id",
    auth,
    authorize("admin"),
    updateReceptionist
);

router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteReceptionist
);

export default router;