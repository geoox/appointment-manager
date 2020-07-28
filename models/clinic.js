const mongoose = require('mongoose')

const ClinicSchema = mongoose.Schema({
    clinic_id: mongoose.Schema.Types.ObjectId,
    location: String,
    schedule: String
})

module.exports = mongoose.model('Clinic', ClinicSchema)