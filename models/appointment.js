const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema({
    appointment_id: mongoose.Schema.Types.ObjectId,
    patient_username: String,
    doctor_username: String,
    date: Date
})

module.exports = mongoose.model('Appointment', AppointmentSchema)