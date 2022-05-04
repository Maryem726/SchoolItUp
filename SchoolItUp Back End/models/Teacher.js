const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    first_name :{
        type : String,
        required : true
    }, 
    last_name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
    },
    birthDate : Date,
    adress : {
        type : String,
        required : true
    },
    pass : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "TEACHER"
    },
    phoneNumber: {
        type : Number,
        required : true
    },
    archived : {
        type : Boolean,
        default : 'false'
    }
});

module.exports = mongoose.model('Teachers', TeacherSchema);

