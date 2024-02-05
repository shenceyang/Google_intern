const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historySchema = new Schema({
    date: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: {},
});

module.exports = mongoose.model('History', historySchema);