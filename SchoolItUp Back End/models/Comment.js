const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    date :{
        type : Date,
        default : Date.now()
    }, 
    archived : {
        type : Boolean,
        default : 'false'
    },
    content : {
        type : String,
        required : true
    },
    teacher : {
        type: Schema.Types.ObjectId,
        ref : 'Teachers',
        required : true
    },
    announcement : {
        type : Schema.Types.ObjectId,
        ref : 'Announcement',
        required : true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);