export function receptionistResponse(receptionist) {
    return {
        id: receptionist._id,
        name: receptionist.name,
        email: receptionist.email,
        phone: receptionist.phone,
        role: receptionist.role,
        isActive: receptionist.isActive,
        createdAt: receptionist.createdAt,
        updatedAt: receptionist.updatedAt
    };
}