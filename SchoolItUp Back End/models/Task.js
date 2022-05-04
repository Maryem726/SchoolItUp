const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    created_at:{
        type : Date,
        default : Date.now()
    },
    deadline:{
        type : Date,
        required : true
    },
    class:{
        type: Schema.Types.ObjectId,
        ref : 'Class',
        required : true
    },
    archived : {
        type : Boolean,
        default : 'false'
    },
    subject : {
        type: Schema.Types.ObjectId,
        ref : 'Class',
        required : true
    },
    teacher : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    
});

module.exports = mongoose.model('Task', TaskSchema);