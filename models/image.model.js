const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let imageSchema = new Schema({
    image: {
        type: String,
        required: true
    }
}, {
    collection: 'images'
})

module.exports = mongoose.model('imageSchema', imageSchema)