const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET_AUTH_JWT = require('../config/settings').SECRET_AUTH_JWT;

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    background: String,
    stared: Boolean,
    admin: {
        type: String,
        required: true,
    },
    people: [],
    listas: [],
    labels: []
}, {
    timestamps: true
})

// userSchema.pre('save', function (next) {
//     const board = this;
//     var passwordLength = 0;
//     if (user.isModified('password')) {

//         if (user.password.length > 15) passwordLength = 15;
//         else passwordLength = user.password.length;

//         bcrypt.genSalt(passwordLength)
//             .then(salt => bcrypt.hash(user.password, salt)
//                 .then(hash => {
//                     console.log(hash)
//                     user.password = hash;
//                     next();
//                 }))
//             .catch(error => {
//                 console.log(error);
//                 res.status(500).redirect('/page-not-found');
//             })
//     } else {
//         return next();
//     }
// });

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


boardSchema.methods.generateToken = function (board) {
    const token = jwt.sign(board, SECRET_AUTH_JWT);
    console.log(token);
    return token;
}

const BoardSchema = mongoose.model("Board", boardSchema);
module.exports = BoardSchema;