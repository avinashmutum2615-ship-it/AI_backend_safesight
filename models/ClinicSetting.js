import mongoose from "mongoose";

const clinicSettingSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },

    workingHours: {
      open: {
        type: String,
        default: "08:00",
      },
      close: {
        type: String,
        default: "17:00",
      },
      openEveryday: {
        type: Boolean,
        default: true,
      },
    },

    appointmentDuration: {
      type: Number,
      default: 20, // minutes
    },

    consultationFees: [
      {
        type: {
          type: String,
          required: true,
        },
        fee: {
          type: Number,
          required: true,
        },
      },
    ],

    services: [
      {
        type: String,
        trim: true,
      },
    ],

    holidayCalendar: [
      {
        date: Date,
        reason: String,
      },
    ],

    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
    },

    address: {
      type: String,
      required: true,
    },

    appointmentUrl: {
      type: String,
      required: true,
    },

    aiSettings: {
      enabled: {
        type: Boolean,
        default: true,
      },

      allowAppointmentBooking: {
        type: Boolean,
        default: true,
      },

      allowComplaintRegistration: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ClinicSetting", clinicSettingSchema);