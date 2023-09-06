import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique : true
    },
    email:{
        type: String,
        required: true,
        unique : true,
    },
    password:{
        type : String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    appointments:[]

}, {timestamps: true});

//arrow function does not bind "this" hence error might occur using isModified
userSchema.pre('save',async function(next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


export default mongoose.model('Users', userSchema);