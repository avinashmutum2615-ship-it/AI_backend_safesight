export function doctorListResponse(user, doctor) {
    return {
        id: doctor._id,

        name: user.name,

        specialization: doctor.specialization,

        qualification: doctor.qualification,

        consultationFee: doctor.consultationFee,

        available: doctor.availability.status,
    };
}