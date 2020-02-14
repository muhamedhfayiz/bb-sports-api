const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
        en: {
            type: String,
            required: true
        },
        ar: {
            type: String,
            required: false
        }
    },
    categoryIcon: {
        type: String,
        required: false
    },
    important: {
        type: Boolean,
        required: false
    }
});

const category = module.exports = mongoose.model('category', categorySchema);