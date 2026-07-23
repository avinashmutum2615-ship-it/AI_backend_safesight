import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({

    visitId: {
        type: String,
        unique: true
    },

    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
        unique: true
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Waiting",
            "In Progress",
            "Completed"
        ],
        default: "Waiting"
    },

    checkedInAt: {
        type: Date,
        default: Date.now
    },

    startedAt: Date,

    completedAt: Date,

    notes: {
        type: String,
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

export default mongoose.model("Visit", visitSchema);