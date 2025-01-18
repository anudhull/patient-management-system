const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: 
        true 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"], 
        default: "Pending" 
    },
    notes: { 
        type: String 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
