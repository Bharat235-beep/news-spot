const express=require('express')
const router = express.Router()
const fetchuser=require('../middleware/fetchuser')

const { body } = require('express-validator');
const MyNews = require('../models/MyNews');
//1.Fetch all notes
router.get('/fetchallnews',fetchuser,async(req,res)=>{
const news=await MyNews.find({user:req.user.id});
res.json(news)
});

//2.Add notes
router.post('/addnews',fetchuser,async(req,res)=>{
    const news=await MyNews.find({user:req.user.id,url:req.body.url}) 
    if(news.length>0){
     return  res.json(news)
    }else{
MyNews.create({
    user:req.user.id,
    title:req.body.title,
    description:req.body.description,
    imageurl:req.body.imageurl,
    url:req.body.url,
    source:req.body.source
}).then(user=>res.json(user))
.catch(error=>{console.log(error)})
    }
})

//3.Update notes


//4.Delete Notes
router.delete('/deletenews/:id',fetchuser,async(req,res)=>{
    let news=await MyNews.findById(req.params.id);
if(!news){
    return res.status(404).send('Not Found')
}
if(req.user.id!==news.user._id.toString()){
    return res.status(401).send('Not Allowed')
}
news=await MyNews.findByIdAndDelete(req.params.id)
res.json({"Success":"Note has been deleted",news:news})
})
module.exports=router
