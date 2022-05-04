const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: false
    },
    birthDate: {
        type : Date,
        required: true
    },
    parent:{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : false
    },
    adress: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "STUDENT",
        enum: ["STUDENT", "PARENT", "TEACHER", "ADMIN"]
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    archived: {
        type: Boolean,
        default: 'false'
    },
    parents_status: {
        type: String,
        required: false
    },
    hosted_by: {
        type: String,
        required: false
    },
    siblings: {
        type: Boolean,
        required: false
    },
    old_school: {
        type: String,
        required: false
    },
    application_status: {
        type: String,
        required: false
    },
    cin: {
        type: String,
        required: false
    },
    etat_civil: {
        type: String,
        required: false
    },
    class: {
        type : Schema.Types.ObjectId,
        ref : 'Class',
        required : false
    }
});

module.exports = mongoose.model('User', UserSchema);