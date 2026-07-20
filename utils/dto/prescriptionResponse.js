export default function prescriptionResponse(prescription) {

    return {

        id: prescription._id,

        visit: prescription.visit,

        patient: prescription.patient,

        doctor: prescription.doctor,

        diagnosis: prescription.diagnosis,

        clinicalComments: prescription.clinicalComments,

        glassPrescription: prescription.glassPrescription,

        medications: prescription.medications,

        actionPlan: prescription.actionPlan,

        procedures: prescription.procedures,

        investigations: prescription.investigations,

        followUp: prescription.followUp,

        referrals: prescription.referrals,

        createdAt: prescription.createdAt,

        updatedAt: prescription.updatedAt

    };

}