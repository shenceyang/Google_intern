const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historySchema = new Schema({
    date: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: {},
});


const HistoryDB = mongoose.connection.useDb('History');    //connect to the db

module.exports = HistoryDB.model('History', historySchema);