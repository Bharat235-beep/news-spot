const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/bharat"
const connectTOMongo=()=>{mongoose.connect(mongoURI)
.then((res)=>{ console.log("Successfully connected"+res)})
.catch((error)=>{ console.log(error)})
}
module.exports=connectTOMongo;