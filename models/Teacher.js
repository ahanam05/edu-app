const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    yoe: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
});

const collectionName = "teachers";
const Teacher = mongoose.model(collectionName, teacherSchema);
module.exports = Teacher;