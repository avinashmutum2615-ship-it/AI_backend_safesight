import dotenv from "dotenv";
import mongoose from "mongoose";

import { getClinicInfo } from "./services/clinicService.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);

const clinic = await getClinicInfo();

console.log(clinic);

process.exit(0);