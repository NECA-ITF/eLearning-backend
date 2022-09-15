const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bcrypt = require('bcrypt')


const userSchema = new Schema({
    fullName: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        requried: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

    userSchema.pre('save', async function (next){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });


    userSchema.statics.login = async function(email, password){
        const user = await this.findOne({email});
        if (user){       
            const auth = await bcrypt.compare(password, user.password);

            if (auth){ 
                return user;
            }
            throw Error ('incorrect password');
        }

        throw Error ('incorrect email')
    }



module.exports = model("User", userSchema);