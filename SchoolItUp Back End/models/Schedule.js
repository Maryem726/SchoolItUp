const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = mongoose.Schema({
    type:{
        type : String,
        required : true
    },
    scan :{
        type : String,
        required : true
    }, 
    archived : {
        type : Boolean,
        default : 'false'
    },
    class : {
        type: Schema.Types.ObjectId,
        ref : 'Class',
        required : false
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);