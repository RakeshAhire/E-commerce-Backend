const { Schema, model } = require("mongoose");

module.exports.Otp = model('Otp', Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },

    createdAt: { type: Date, default: Date.now, index: { expires: 300 } }

    // After 5 minutes it deleted automatically from the database
}, { timestamps: true, versionKey: false }))