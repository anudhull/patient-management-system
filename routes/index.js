const express = require("express");

const authRoutes = require("./auth");
const patientRecordRoutes = require("./patientRecord");
const appointmentRoutes = require("./appointment");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRecordRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;
