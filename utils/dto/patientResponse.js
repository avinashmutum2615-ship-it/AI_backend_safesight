export function patientResponse(patient) {
    return {
        id: patient._id,
        patientId: patient.patientId,
        name: patient.name,
        gender: patient.gender,
        dateOfBirth: patient.dateOfBirth,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        bloodGroup: patient.bloodGroup,
        emergencyContact: patient.emergencyContact,
        isActive: patient.isActive,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
    };
}