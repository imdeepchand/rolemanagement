const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
}, {
    collection: 'students'
})

module.exports = mongoose.model('StudentSchema', studentSchema)