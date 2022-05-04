const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = mongoose.Schema({
    grade :{
        type : String,
        required : true
    }, 
    archived : {
        type : Boolean,
        default : 'false'
    },
    schedule : {
        type: Schema.Types.ObjectId,
        ref : 'Schedule',
        required : false
    }
});

module.exports = mongoose.model('Class', ClassSchema);