const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
},{
    timestamps: true
});


module.exports =mongoose.model("User", userSchema)