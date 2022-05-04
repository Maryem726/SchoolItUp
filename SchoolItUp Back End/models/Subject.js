const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    grade:{
        type : String,
        required : true
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
    class : {
        type: Schema.Types.ObjectId,
        ref : 'Class',
        required : true
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);