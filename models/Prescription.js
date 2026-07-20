import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
    {
        eye: {
            type: String,
            enum: ["Both Eyes", "Right Eye", "Left Eye", "Systemic"],
            required: true,
        },
        disease: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const medicationSchema = new mongoose.Schema(
    {
        eye: {
            type: String,
            enum: ["Both Eyes", "Right Eye", "Left Eye", "Systemic"],
        },

        dosageForm: {
            type: String,
            trim: true,
        },

        medicine: {
            type: String,
            trim: true,
        },

        dose: {
            type: String,
            trim: true,
        },

        frequency: {
            type: String,
            trim: true,
        },

        duration: {
            type: String,
            trim: true,
        },

        remarks: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const procedureSchema = new mongoose.Schema(
    {
        eye: {
            type: String,
            enum: ["Both Eyes", "Right Eye", "Left Eye", "Systemic"],
        },

        procedure: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const investigationSchema = new mongoose.Schema(
    {
        eye: {
            type: String,
            enum: ["Both Eyes", "Right Eye", "Left Eye", "Systemic"],
        },

        test: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const referralSchema = new mongoose.Schema(
    {
        doctorName: String,
        specialty: String,
        phone: String,
        email: String,
    },
    { _id: false }
);

const eyePrescriptionSchema = new mongoose.Schema(
    {
        dsph: String,
        dcyl: String,
        axis: String,
        bcva: String,

        add: String,
        nearVision: String,
        cm: String,
        preference: String,
    },
    { _id: false }
);

const prescriptionSchema = new mongoose.Schema(
    {
        visit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit",
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

        diagnosis: [diagnosisSchema],

        clinicalComments: {
            type: String,
            trim: true,
            default: "",
        },

        glassPrescription: {
            rightEye: eyePrescriptionSchema,
            leftEye: eyePrescriptionSchema,

            remarks: {
                type: String,
                default: "",
            },
        },

        medications: [medicationSchema],

        actionPlan: {
            type: String,
            default: "",
        },

        procedures: [procedureSchema],

        investigations: [investigationSchema],

        followUp: {
            duration: String,
            date: Date,
        },

        referrals: [referralSchema],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Prescription", prescriptionSchema);