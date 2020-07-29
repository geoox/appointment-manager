const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Appointment = require("../models/appointment");
const User = require("../models/user");

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
                            password: hash,
                            user_role: req.body.user_role,
                            specialty: req.body.specialty,
                        });
                    } else if (req.body.journal) {
                        newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            user_role: req.body.user_role,
                            journal: req.body.journal,
                        });
                    } else {
                        newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            user_role: req.body.user_role
                        });
                    }
                    newUser
                        .save()
                        .then((result) => {
                            res.status(200).json({
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

router.get('/patient_details/:user', (req, res, next) => {
    User.find(
        {
            username: req.params.user,
            user_role: 'patient'
        }, 'username user_role journal'
    ).then(patients => res.status(200).json(patients)).catch(err => res.status(500).json(err));
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

module.exports = router;