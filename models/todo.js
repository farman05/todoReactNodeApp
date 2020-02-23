const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    detail: {
        type: String,
        required: true,
        trim:true
    },
    done: {
        type: Boolean,
    },
    duedate:{
           type:Date 
    }
});





module.exports = mongoose.model('Todo', TodoSchema);