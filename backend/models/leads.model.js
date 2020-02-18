const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leadsSchema = new Schema({
    name: { type: String, required: false},
    lastname: {type: String, required: false},
    email: {type: String, required: false},
    tlfnr: {type: Number, required: false},
    comment: {type: String, required: false},
    date: { type: Date, required: false},

}, {
    timestamps: true,
});

module.exports = mongoose.model('Lead', leadsSchema);

