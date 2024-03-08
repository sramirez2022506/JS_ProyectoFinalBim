import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is obligaotry"]
    },

    email: {
        type: String,
        required: [true, "The email is obligatory"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "The password is obligatory"]
    },

    role: {
        type: String,
        enum: ["ADMIN:ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },

    state: {
        type: Boolean, 
        default: true
    }
});

UserSchema.methods.toJSON = function (){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model('User', UserSchema);