const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            unique: true
        },
        institution:{
            type: String,
            required: false
        },
        department: {
            type : String,
            required: false
        }

    }
);

module.exports = mongoose.model('Teacher', teacherSchema)