const mongoose=require('mongoose');
const NewsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
       
    },
    description:{
        type:String,
       
    },
    imageurl:{
        type:String,
      
    },
    url:{
        type:String,
      
    },
    source:{
        type:String,
    }
   
})
module.exports=mongoose.model('news',NewsSchema)