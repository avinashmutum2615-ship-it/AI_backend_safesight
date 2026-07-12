import dotenv from "dotenv";
import mongoose from "mongoose";
import ClinicSetting from "../models/ClinicSetting.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);

await ClinicSetting.deleteMany();

await ClinicSetting.create({
  clinicName: "SafeSight Eye Care",

  workingHours: {
    open: "08:00 AM",
    close: "05:00 PM",
    openEveryday: true,
  },

  consultationFees: [
    {
      type: "New Patient",
      fee: 300,
    },
    {
      type: "Checkup",
      fee: 100,
    },
    {
      type: "Charity",
      fee: 0,
    },
  ],

  appointmentUrl:
    "https://safesighteyecare.in/appointment",

  contact: {
    phone: "+91XXXXXXXXXX",
    email: "info@safesighteyecare.in",
  },

  address: "Thoubal, Manipur",

  services: [
    "Cataract Surgery",
    "LASIK",
    "Glaucoma",
    "Retina",
    "Squint",
    "Contact Lens",
  ],
});

console.log("✅ Clinic Setting Seeded");

process.exit(0);