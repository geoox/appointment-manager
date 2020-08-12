const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Appointment = require("../models/appointment");
const User = require("../models/user");
const Clinic = require("../models/clinic");

router.get("/hello", (req, res, next) => {
    return res.status(200).json({
        message: "hello",
    });
});

router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username: username,
    })
        .then((user) => {
            if (user.length < 1) {
                res.status(401).json({
                    message: "Auth failed",
                });
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err || !result) {
                        return res.status(401).json({
                            message: "Auth failed",
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                _id: user._id,
                                username: user.username
                            },
                            "jwt_pw",
                            {
                                expiresIn: "1h",
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            username: user.username,
                            role: user.user_role,
                            token: token,
                        });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post("/register", (req, res, next) => {
    User.find({
        username: req.body.username,
    }).then((user) => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "username already exists",
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                } else {
                    var newUser;
                    if (req.body.specialty) {
                        newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            name: req.body.name,
                            password: hash,
                            user_role: req.body.user_role,
                            specialty: req.body.specialty,
                        });
                    } else if (req.body.journal) {
                        newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            name: req.body.name,
                            password: hash,
                            user_role: req.body.user_role,
                            journal: req.body.journal,
                        });
                    } else {
                        newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            name: req.body.name,
                            password: hash,
                            user_role: req.body.user_role
                        });
                    }
                    newUser
                        .save()
                        .then((result) => {
                            return res.status(200).json({
                                result: result,
                            });
                        })
                        .catch((err) =>
                            res.status(500).json({
                                error: err,
                            })
                        );
                }
            });
        }
    });
});

router.get('/specialties', (req, res, next) => {
    User.find({}, { 'specialty': 1, '_id': 0 },).then(
        specialties => {
            const result = specialties.filter(specialty => JSON.stringify(specialty) !== '{}')
            var resultArr = [];
            result.forEach(el => {
                resultArr.push(el["specialty"]);
            })

            console.log(resultArr);
            return res.status(200).json(
                resultArr
            )
        }
    ).catch(err => res.status(500).json(err));
});

router.get('/patient/:user', (req, res, next) => {
    User.find(
        {
            username: req.params.user,
            user_role: 'patient'
        }, 'username user_role journal name history'
    ).then(patients => res.status(200).json(patients)).catch(err => res.status(500).json(err));
});

router.get('/doctor/:user', (req, res, next) => {
    User.find(
        {
            username: req.params.user,
            user_role: 'doctor'
        }, 'username user_role specialty name'
    ).then(doctors => res.status(200).json(doctors)).catch(err => res.status(500).json(err));
});

router.get('/doctors/', (req, res, next) => {
    User.find(
        {
            user_role: 'doctor'
        }, 'username user_role specialty name'
    ).then(doctors => res.status(200).json(doctors)).catch(err => res.status(500).json(err));
});

router.get('/doctors/:specialty', (req, res, next) => {
    User.find(
        {
            user_role: 'doctor',
            specialty: req.params.specialty
        }, 'username user_role specialty name'
    ).then(doctors => res.status(200).json(doctors)).catch(err => res.status(500).json(err));
});

router.post("/new_appointment", (req, res, next) => {
    const newAppointment = new Appointment({
        "patient_username": req.body.patient_username,
        "doctor_username": req.body.doctor_username,
        "date": new Date(req.body.date)
    });

    newAppointment.save().then(success =>
        res.status(200).json(success)
    ).catch(err => res.status(500).json(err));
});

router.get('/appointments', (req, res, next) => {
    Appointment.find({}).then(appointments => res.status(200).json(appointments)).catch(err => res.status(500).json(err));
});

router.get('/appointments/doctor/:user', (req, res, next) => {
    Appointment.find({
        doctor_username: req.params.user
    }).then(appointments => res.status(200).json(appointments)).catch(err => res.status(500).json(err));
});

router.get('/appointments/patient/:user', (req, res, next) => {
    Appointment.find({
        patient_username: req.params.user
    }).then(appointments => res.status(200).json(appointments)).catch(err => res.status(500).json(err));
});

router.post('/clinics', (req, res, next) => {
    let newClinic = new Clinic({
        name: req.body.name,
        location: req.body.location,
        schedule: req.body.schedule
    })

    newClinic.save().then(result => res.status(200).json(result)).catch(err => res.status(500).json(err));
});

router.get('/clinics', (req, res, next) => {
    Clinic.find({}).then(clinics => res.status(200).json(clinics)).catch(err => res.status(500).json(err));
})

router.get('/accounts', (req, res, next) => {
    User.find({}).then(users => res.status(200).json(users)).catch(err => res.status(500).json(err));
})

router.put('/patient/update/:user', (req, res, next) => {
    User.findOneAndUpdate({
        username: req.params.user
    },
    {
        journal: req.body.journal
    })
    .then(resp => res.status(200).json(resp)).catch(err => res.status(500).json(err));
})

router.get('/appointments/patient/:user/future', (req, res, next) => {
    Appointment.find({
        patient_username: req.params.user
    }).where('date').gt(new Date()).then(appointments => res.status(200).json(appointments)).catch(err => res.status(500).json(err));
})

router.get('/appointments/patient/:user/past', (req, res, next) => {
    Appointment.find({
        patient_username: req.params.user
    }).where('date').lt(new Date()).sort('-date')
    .then(appointments => res.status(200).json(appointments)).catch(err => res.status(500).json(err));
})

module.exports = router;