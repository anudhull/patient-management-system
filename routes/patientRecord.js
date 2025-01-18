const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth");
const { createPatientRecord, getPatientRecords, getPatientRecord, updatePatientRecord, deletePatientRecord } = require("../controllers/patientRecordController");

const router = express.Router();

// Routes for managing patient records
router.post("/", authenticate, authorize(["DOCTOR", "ADMIN"]), createPatientRecord);
router.get("/", authenticate, authorize(["DOCTOR", "ADMIN", "PATIENT"]), getPatientRecords);
router.get("/:id", authenticate, authorize(["DOCTOR", "ADMIN", "PATIENT"]), getPatientRecord);
router.put("/:id", authenticate, authorize(["DOCTOR", "ADMIN"]), updatePatientRecord);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deletePatientRecord);


module.exports = router;
