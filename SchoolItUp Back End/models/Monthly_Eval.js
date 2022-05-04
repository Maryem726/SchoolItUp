const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MESchema = mongoose.Schema({
    productivity:{
        type : Number,
        required : true
    },
    participation:{
        type : Number,
        required : true
    },
    behavior:{
        type : Number,
        required : true
    },
    productivity_average:{
        type : Number,
        required : true
    },
    student_eval:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default : Date.now()
    },
    archived : {
        type : Boolean,
        default : 'false'
    },
    teacher : {
        type: Schema.Types.ObjectId,
        ref : 'Teachers',
        required : true
    },
    subject : {
        type: Schema.Types.ObjectId,
        ref : 'Subject',
        required : true
    }
});

module.exports = mongoose.model('Monthly_Eval', MESchema);