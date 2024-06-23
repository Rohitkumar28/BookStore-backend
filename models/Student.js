const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    roll: {type: String, required: true, unique: true},
    username : {type: String , required: true, unique: true},
    grade : {type: String , required: true},
    password : {type: String , required: true }
})

module.exports = mongoose.model('Student', studentSchema)