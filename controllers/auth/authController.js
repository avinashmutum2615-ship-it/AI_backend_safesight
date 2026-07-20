import { loginUser } from "../../services/admin/authService.js";

export async function login(req, res) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            ...result,
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }
}