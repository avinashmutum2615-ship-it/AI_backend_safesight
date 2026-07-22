import express from "express";

import { publicChat } from "../../controllers/ai/publicChatController.js";

const router = express.Router();

router.post("/", publicChat);

export default router;