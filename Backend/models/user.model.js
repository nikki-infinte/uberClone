const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minLength:[3,'Last name must be at least 3 characters long']
        }

    },
    email:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator:function(v){
                    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
                },
                message:'Invalid email format'
            }
        },
    password:{
            type:String,
            required:true,
            select:false,
            minLength:[6,'Password must be at least 6 characters long']
        },
    socketId:{
        type:String,
        
    }
    
});
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
userSchema.methods.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;