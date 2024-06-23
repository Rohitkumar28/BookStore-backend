const express = require('express');
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin.js");
require("./connection/conn");

async function AdminAccount() {
    try {
        const adminCount = await Admin.countDocuments()
        if(adminCount === 0){
            const hashPassword = await bcrypt.hash('process.env.Admin_Password', 10)
            const newAdmin = new Admin({
                username : 'admin',
                password : hashPassword
            })
            await newAdmin.save();
            console.log("account created")
        }else {
            console.log("account already existed")
        }
    } catch (error) {
        console.log("error")
    }
}

AdminAccount();
