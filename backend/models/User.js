const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET_AUTH_JWT = require('../config/password').SECRET_AUTH_JWT;
// const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    nick: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    info: {
        name: {
            type: String,
        },
        lastname: {
            type: String,
        },
        avatar: {
            type: String
        },
        confirmedEmail: {
            type: Boolean,
            default: false
        },
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    const user = this;
    var passwordLength = 0;
    if (user.isModified('password')) {

        if (user.password.length > 15) passwordLength = 15;
        else passwordLength = user.password.length;

        bcrypt.genSalt(passwordLength)
            .then(salt => bcrypt.hash(user.password, salt)
                .then(hash => {
                    console.log(hash)
                    user.password = hash;
                    next();
                }))
            .catch(error => {
                console.log(error);
                res.status(500).redirect('/page-not-found');
            })
    } else {
        return next();
    }
});

// userSchema.methods.toJSON = function () {
//     const {
//         _id,
//         name,
//         nick,
//         email,
//         confirmedEmail,
//         token,
//         avatar,
//     } = this;
//     return {
//         _id,
//         name,
//         nick,
//         email,
//         confirmedEmail,
//         avatar,
//         token
//     };
// }

// userSchema.methods.generateAuthToken = function () {
//     const user = this;
//     const token = jwt.sign({
//         _id: user._id
//     }, SECRET_AUTH_JWT);
//     return token;
// }

userSchema.index({
    nick: 1,
    email: 1,
    password: 1,
}, {
    unique: true,
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;