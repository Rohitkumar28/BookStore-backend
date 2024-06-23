const express = require('express');
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
// const  verifyAdmin  = require('./auth');
const router = express.Router();

router.post('/register',  async (req,res) => {
    try {
        const {roll, username, grade, password} = req.body;
        const student = await Student.findOne({username})
        if(student){
            return res.json({message: "student is registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newstudent = new Student({
            username ,
            password: hashPassword,
            roll: roll,
            grade: grade
        })
        await newstudent.save()
        return res.json({registered: true})
    } catch (error) {
        return res.json({message: "Error in registring students"});
    }
})

module.exports = router;

