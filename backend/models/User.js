const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_AUTH_JWT = require('../config/settings').SECRET_AUTH_JWT;
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
    },
    tokens: {
        login: {
            type: String
        },
        boards: [],
    },
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
                res.status(500).redirect('/');
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

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id
    }, SECRET_AUTH_JWT);
    return token;
}

userSchema.methods.generateBoardToken = function (board) {
    const token = jwt.sign(board, SECRET_AUTH_JWT);
    console.log(token);
    return token;
}

userSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });
  };
  
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
