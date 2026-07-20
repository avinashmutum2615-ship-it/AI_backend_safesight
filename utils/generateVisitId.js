import Visit from "../models/Visit.js";

export default async function generateVisitId() {

    const lastVisit = await Visit.findOne()
        .sort({ createdAt: -1 });

    if (!lastVisit || !lastVisit.visitId) {
        return "VIS000001";
    }

    const number = parseInt(
        lastVisit.visitId.replace("VIS", "")
    );

    return `VIS${String(number + 1).padStart(6, "0")}`;

}