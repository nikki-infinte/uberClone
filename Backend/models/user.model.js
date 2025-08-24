const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;