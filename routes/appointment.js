const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// Routes for managing appointments
router.post("/", authenticate, authorize(["PATIENT", "ADMIN"]), createAppointment);
router.get("/", authenticate, authorize(["DOCTOR", "ADMIN", "PATIENT"]), getAppointments);
router.get("/:id", authenticate, authorize(["DOCTOR", "ADMIN", "PATIENT"]), getAppointment);
router.put("/:id", authenticate, authorize(["DOCTOR", "PATIENT", "ADMIN"]), updateAppointment);
router.delete("/:id", authenticate, authorize(["ADMIN", "PATIENT"]), deleteAppointment);

module.exports = router;
