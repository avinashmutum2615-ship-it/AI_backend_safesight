import dotenv from "dotenv";
import { hashPassword } from "../utils/hashPassword.js";

import { connectDb } from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

await connectDb();

try {

    const adminExists = await User.findOne({
        role: "admin",
    });

    if (adminExists) {
        console.log("Admin already exists.");
        process.exit(0);
    }

   const hashedPassword = await hashPassword(
    process.env.ADMIN_PASSWORD
);

    const admin = await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        phone: process.env.ADMIN_PHONE,
        password: hashedPassword,
        role: "admin",
    });

    console.log("Admin created successfully.");
    console.log(admin);

    process.exit(0);

} catch (error) {

    console.error(error);

    process.exit(1);

}