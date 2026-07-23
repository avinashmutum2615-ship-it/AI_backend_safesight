import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      default: "",
      trim: true,
    },

    designation: {
      type: String,
      default: "Receptionist",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    availability: {
      status: {
        type: Boolean,
        default: true,
      },

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

export default mongoose.model("Receptionist", receptionistSchema);