const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const metricSchema = new Schema({
    UserID: {
        type: String,
    },
    CPU_Usage: {
       type: Number,
    },
    Memory_Usage: {
       type: Number,
    },
    Memory_Allocation: {
       type: Number,
   }
});
const Metrics = mongoose.model('Metrics', metricSchema);
module.exports = {Metrics, metricSchema};