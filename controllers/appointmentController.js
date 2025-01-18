const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.createAppointment = async (req, res) => {
  const { doctor, start, end, notes } = req.body;

  try {
    // Validate doctor
    const doctorUser = await User.findOne({ _id: doctor, role: "DOCTOR" });
    if (!doctorUser) {
      return res.status(400).json({ error: "Invalid doctor ID or user is not a doctor" });
    }

    // Validate time
    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({ error: "Appointmemt end time must be after start time" });
    }

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor,
      start,
      end,
      notes,
      createdBy: req.user.id,
    });

    await newAppointment.save();
    return res.status(201).json(newAppointment);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let filter = { isActive: true };

    if (req.user.role === "PATIENT") {
      filter.patient = req.user.id;
    } else if (req.user.role === "DOCTOR") {
      filter.doctor = req.user.id;
    }

    const appointments = await Appointment.find(filter)
      .populate("patient", "name email")
      .populate("doctor", "name email");

    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.getAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOne({ _id: id, isActive: true });

    if (!appointment) {
      return res.status(404).json({ error: "No active appointment found" });
    }

    // verify doctor can only see their assigned patients' appointment and patient can view their own
    const allow = req.user.role === 'DOCTOR' ? appointment.doctor.toString() === req.user.id : 
      req.user.role === 'PATIENT' ? appointment.patient.toString() === req.user.id : true;

    if (!allow) {
      return res.status(403).json({ error: "You are not allowed to view this appointment" });
    }

    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const appointment = await Appointment.findOne({ _id: id, isActive: true });

    if (!appointment) {
      return res.status(404).json({ error: "No active appointment found" });
    }

    // verify doctor can only update their assigned patients' appointment and patient can update their own
    const allow = req.user.role === 'DOCTOR' ? appointment.doctor.toString() === req.user.id : 
    req.user.role === 'PATIENT' ? appointment.patient.toString() === req.user.id : true;

    if (!allow) {
      return res.status(403).json({ error: "You are not allowed to update this appointment" });
    }

    await Appointment.updateOne({ _id: id }, { $set: body });
    return res.status(200).json({ message: "Appointment updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOne({ _id: id, isActive: true });

    if (!appointment) {
      return res.status(404).json({ error: "No active appointment found" });
    }

    // soft update
    await Appointment.updateOne({ _id: id }, { $set: { isActive: false } });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
