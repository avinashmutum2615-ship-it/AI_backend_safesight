import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
    },



    availability: {
      status: {
        type: Boolean,
        default: true,
      },

      workingDays: {
        type: [Number],
        default: [0, 1, 2, 3, 4, 5, 6], 
      },

      startTime: {
        type: String,
        default: "09:00",
      },

      endTime: {
        type: String,
        default: "17:00",
      },

      slotDuration: {
        type: Number,
        default: 30,
      },

      breaks: [
        {
          start: String,
          end: String,
        },
      ],

      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    },

  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);