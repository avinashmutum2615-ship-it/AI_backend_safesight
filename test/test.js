import "dotenv/config";
import mongoose from "mongoose";

import { todayAppointmentsTool } from "../src/ai/tools/appointment/todayAppointmentsTool.js";

await mongoose.connect(process.env.MONGODB_URL);

try {

    const result = await todayAppointmentsTool.func(
        {},
        {
            configurable: {
                user: {
                    id: "YOUR_USER_ID",
                    role: "receptionist",
                    name: "Receptionist"
                }
            }
        }
    );

    console.log(JSON.stringify(result, null, 2));

} finally {

    await mongoose.disconnect();

}