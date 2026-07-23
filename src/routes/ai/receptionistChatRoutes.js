import express from "express";
import { chat } from "../../controllers/ai/receptionistChatController.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", auth, chat);

export default router;