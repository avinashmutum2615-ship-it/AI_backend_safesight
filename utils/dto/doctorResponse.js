export function doctorResponse(user, doctor) {

    return {

        id: doctor._id,

        userId: user._id,

        name: user.name,

        email: user.email,

        phone: user.phone,

        role: user.role,

        isActive: user.isActive,

        specialization: doctor.specialization,

        qualification: doctor.qualification,

        experience: doctor.experience,

        consultationFee: doctor.consultationFee,

        available: doctor.availability.status,

        createdAt: doctor.createdAt,

        updatedAt: doctor.updatedAt,

    };

}