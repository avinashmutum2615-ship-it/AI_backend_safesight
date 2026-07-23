import mongoose from "mongoose";

const eyeSchema = new mongoose.Schema(
    {
        right: {
            type: String,
            default: "",
        },
        left: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const examinationSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
            unique: true,
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        chiefComplaint: {
            type: String,
            default: "",
        },

        historyOfPresentIllness: {
            type: String,
            default: "",
        },

        visualAcuity: eyeSchema,

        refraction: eyeSchema,

        intraocularPressure: eyeSchema,

        slitLamp: eyeSchema,

        fundus: eyeSchema,

        diagnosis: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Examination",
    examinationSchema
);