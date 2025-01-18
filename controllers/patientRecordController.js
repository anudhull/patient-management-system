const PatientRecord = require("../models/PatientRecord");
const User = require("../models/User");

exports.createPatientRecord = async (req, res) => {
  const { patient, age, gender, contactInfo, medicalHistory, assignedDoctor } = req.body;

  try {
      // Validate patient exists and has the PATIENT role
      const patientUser = await User.findOne({ _id: patient, role: "PATIENT" });
      if (!patientUser) {
        return res.status(400).json({ error: "Invalid patient Id or user is not a patient" });
      }
  
      // Validate assigned doctor exists
      const doctorUser = await User.findOne({ _id: assignedDoctor, role: "DOCTOR" });
      if (!doctorUser) {
        return res.status(400).json({ error: "Invalid doctor Id or user is not a doctor" });
      }

    const newRecord = new PatientRecord({
      patient,
      age,
      gender,
      contactInfo,
      medicalHistory,
      assignedDoctor,
      createdBy: req.user.id,
    });

    await newRecord.save();
    return res.status(201).json(newRecord);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.getPatientRecords = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'DOCTOR') {
      filter.assignedDoctor = req.user.id;
    } else if (req.user.role === 'PATIENT') {
      filter.patient = req.user.id;
    }
    const records = await PatientRecord.find(filter).populate("patient", "name email").populate("assignedDoctor", "name email");
    return res.status(200).json(records);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.getPatientRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await PatientRecord.findOne({ _id: id });

    if (!record) {
      return res.status(404).json({ error: "Patient record not found" });
    }

    // verify doctor can only see their assigned patients and patient can only see their own record
    const allow = req.user.role === 'DOCTOR' ? record.assignedDoctor.toString() === req.user.id : 
      req.user.role === 'PATIENT' ? record.patient.toString() === req.user.id : true;
    if (!allow) {
      return res.status(403).json({ error: "You are not allowed to view this record" });
    }

    res.status(200).json(record);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.updatePatientRecord = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const record = await PatientRecord.findById(id);

    if (!record) {
      return res.status(404).json({ error: "Patient record not found" });
    }

    await PatientRecord.updateOne({ _id: id }, { $set: body });
    return res.status(200).json({ message: "Patient record updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.deletePatientRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await PatientRecord.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).json({ error: "Patient record not found" });
    }

    return res.status(200).json({ message: "Patient record deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};