const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult}=require('express-validator');

module.exports.registerUser =async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {fullname,email,password}=req.body;
    const firstname = fullname.firstname;
    const lastname = fullname.lastname;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password:hashPassword});
    const token = user.generateAuthToken();
    return res.status(201).json({ token,user });
}

