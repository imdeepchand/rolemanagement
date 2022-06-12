const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let loginSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    login_time: {
        type: String,
        required: true,
    }
}, {
    collection: 'loginlogs'
})

module.exports = mongoose.model('LoginSchema', loginSchema)