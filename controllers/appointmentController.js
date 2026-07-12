import { 
    createAppointmentService, getTodayAppointmentsService, searchAppointmentsService,
    getAppointmentByIdService, updateAppointmentStatusService, deleteAppointmentService ,
    getDashboardService
    } from "../services/appointment/appointmentService.js";

import {
    appointmentResponse,
    appointmentListResponse,
} from "../utils/dto/appointmentResponse.js";

import { dashboardResponse } from "../utils/dto/dashboardResponse.js";



export async function createAppointment(req, res) {

    try {

        const appointment = await createAppointmentService(
            req.body,
            req.user._id
        );

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully.",
            appointment: appointmentResponse(appointment),
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message, 
        });

    }

}

export async function getTodayAppointments(req, res) {

    try {

        const appointments = await getTodayAppointmentsService();

        res.status(200).json({
            success: true,
            total: appointments.length,
            appointments: appointmentListResponse(appointments),
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message, 
        });

    }


}

export async function searchAppointments(req, res) {

    try {

        const appointments = await searchAppointmentsService(req.query);

        res.status(200).json({
            success: true,
            total: appointments.length,
            appointments: appointmentListResponse(appointments),
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

export async function getAppointmentById(req, res) {

    try {

        const appointment = await getAppointmentByIdService(req.params.id);

        res.status(200).json({
            success: true,
            appointment: appointmentResponse(appointment),
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

}

export async function updateAppointmentStatus(req, res) {

    try {

        const appointment = await updateAppointmentStatusService(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully.",
            appointment: appointmentResponse(appointment),
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

export async function deleteAppointment(req, res) {

    try {

        await deleteAppointmentService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully.",
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

export async function getDashboard(req, res) {

    try {

        const dashboard = await getDashboardService();

        res.status(200).json({
            success: true,
            dashboard: dashboardResponse(dashboard),
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}