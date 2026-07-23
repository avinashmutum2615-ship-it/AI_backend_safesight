import {
    checkInAppointmentService,
    getTodaysVisitsService,
    getVisitByIdService,
    startVisitService,
    completeVisitService
} from "../../services/visit/visitService.js";

export const checkInAppointment = async (req, res) => {

    try {

        const visit = await checkInAppointmentService(req.params.id);

        res.status(201).json({
            success: true,
            message: "Patient checked in successfully.",
            visit
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const getTodaysVisits = async (req, res) => {

    try {

        const visits = await getTodaysVisitsService();

        res.json({
            success: true,
            visits
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getVisitById = async (req, res) => {

    try {

        const visit = await getVisitByIdService(req.params.id);

        res.json({
            success: true,
            visit
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

export const startVisit = async (req, res) => {

    try {

        const visit = await startVisitService(req.params.id);

        res.json({
            success: true,
            message: "Visit started successfully.",
            visit
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const completeVisit = async (req, res) => {

    try {

        const visit = await completeVisitService(
            req.params.id,
            req.body.notes
        );

        res.json({
            success: true,
            message: "Visit completed successfully.",
            visit
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};