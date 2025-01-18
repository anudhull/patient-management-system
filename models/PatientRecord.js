const mongoose = require("mongoose");

const PatientRecordSchema = new mongoose.Schema({
    patient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    age: { 
        type: Number,
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Other"], 
        required: true 
    },
    contactInfo: {
        phone: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
    },
    medicalHistory: { 
        type: String, 
        required: true 
    },
    assignedDoctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
});

module.exports = mongoose.model("PatientRecord", PatientRecordSchema);
