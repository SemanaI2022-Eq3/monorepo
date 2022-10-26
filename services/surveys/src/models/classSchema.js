const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            unique: true
        },
        teacher:{
            type: mongoose.ObjectId,
            ref: 'Teacher',
            required: true
        }

    }
);

module.exports = mongoose.model('Class', classSchema)
