const mongoose= require('mongoose')
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    
},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model('category',categorySchema)