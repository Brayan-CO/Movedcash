const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    event: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
