const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    department:{type:String, enum: ['Tech', 'Marketing', 'Operations'], required:true},
    salary:{type:Number, required:true}
})

module.exports = mongoose.model('Employee',empSchema)