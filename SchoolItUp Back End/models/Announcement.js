const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = mongoose.Schema({
    date :{
        type : Date,
        default : Date.now()
    }, 
    archived : {
        type : Boolean,
        default : 'false'
    },
    description : {
        type : String,
        required : true
    },
    subject : {
        type: Schema.Types.ObjectId,
        ref : 'Subject',
        required : true
    },
    teacher : {
        type: Schema.Types.ObjectId,
        ref : 'Teachers',
        required : true
    }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);