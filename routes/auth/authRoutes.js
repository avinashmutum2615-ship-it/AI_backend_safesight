import express from "express";
import { login } from "../../controllers/auth/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

export default router;  