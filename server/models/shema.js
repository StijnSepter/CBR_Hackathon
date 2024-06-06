const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const testSchema = new Shema({

}, { timestamps: true })

const Shema = mongoose.model('User', testSchema);
module.exports.Shema = Shema;
