const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({

    categoryId: {
        type: String,
        required: true
    },
    subCategoryName: [{
        en: {
            type: String,
            required: true
        },
        ar: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    }]
});



const subCategory = module.exports = mongoose.model('subCategory', subCategorySchema);