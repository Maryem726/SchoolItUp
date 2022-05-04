const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepositSchema = mongoose.Schema({
    task:{
        type: Schema.Types.ObjectId,
        ref : 'Task',
        required : true
    },
    img_location:{
        type : String,
        required : true
    },
    img_type:{
        type : String,
        required : true
    },
    deposited_at:{
        type : Date,
        default : Date.now()
    },
    deadline_respected:{
        type : Boolean,
        required : true
    },
    archived : {
        type : Boolean,
        default : 'false'
    },
    student:{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    mark:{
        type : Number,
        required: false
    },
    side_notes:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Deposit', DepositSchema);