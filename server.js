import "./config/env.js";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/ai/chatRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import { connectDb } from "./config/database.js";
import { auth } from "./middleware/auth.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import patientRoutes from "./routes/patient/patientRoutes.js";
import doctorRoutes from "./routes/doctor/doctorRoutes.js";
import appointmentRoutes from "./routes/appointment/appointmentRoutes.js";
import receptionistRoutes from"./routes/receptionist/receptionistRoutes.js";
import prescriptionRoutes from "./routes/prescription/prescriptionRoutes.js";
import publicRoute from "./routes/ai/publicRoute.js";
import doctorRoute from "./routes/ai/doctorRoute.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDb();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
 
app.use("/api/auth", authRoutes);
app.use("/api/ai/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/receptionists", receptionistRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/public/chat", publicRoute);
app.use("/api/doctor/chat", doctorRoute);

app.get("/", (req, res) => {
    res.send("Welcome to SafeSight AI");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});