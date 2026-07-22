import express from "express";

import { doctorChat } from "../../controllers/ai/doctorChatController.js";

import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    auth,
    authorize("doctor"),
    doctorChat
);

export default router;