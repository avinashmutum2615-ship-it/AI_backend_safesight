import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";

router.use(auth);

router.get(
    "/today",
    authorize("admin", "doctor"),
    getTodaysVisits
);

router.get(
    "/:id",
    authorize("admin", "doctor"),
    getVisitById
);

router.patch(
    "/:id/start",
    authorize("admin", "doctor"),
    startVisit
);

router.patch(
    "/:id/complete",
    authorize("admin", "doctor"),
    completeVisit
);