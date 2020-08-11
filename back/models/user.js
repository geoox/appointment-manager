const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    username: String,
    name: String,
    password: String,
    user_role: {
        type: String,
        enum : ['doctor','admin', 'patient'],
        default: 'patient'
    },
    specialty: String, //only for doctor
    journal: String, //only for patient
    history: String //only for patient
})

module.exports = mongoose.model('User', UserSchema)