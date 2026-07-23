import ClinicSetting from "../../models/ClinicSetting.js";

export async function getAppointmentLink() {
    const clinic = await ClinicSetting.findOne();

    if (!clinic) {
        return null;
    }

    return {
        appointmentUrl: clinic.appointmentUrl,
    };
}