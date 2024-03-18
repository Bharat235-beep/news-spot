const express=require('express')
const router = express.Router()
const fetchuser=require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body } = require('express-validator');
//1.Fetch all notes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
const notes=await Notes.find({user:req.user.id});
res.json(notes)
});

//2.Add notes
router.post('/addnotes',[body('title').isLength({min:5}),
body('description').isLength({min:10})],fetchuser,(req,res)=>{
Notes.create({
    user:req.user.id,
    title:req.body.title,
    description:req.body.description,
    tag:req.body.tag
}).then(user=>res.json(user))
.catch(error=>{console.log(error)})
})

//3.Update notes
router.put('/updatenotes/:id',[body('title').isLength({min:5}),
body('description').isLength({min:10})],fetchuser,async(req,res)=>{
const newNote={};
if(req.body.title){newNote.title=req.body.title}
if(req.body.description){newNote.description=req.body.description}
if(req.body.tag){newNote.tag=req.body.tag}
let note=await Notes.findById(req.params.id);
if(!note){
    return res.status(404).send('Not Found')
}
if(req.user.id!==note.user._id.toString()){
    // req.user.id
//   console.log(req.user.id)
//   console.log(req.params.id)
//   console.log(note.user._id.toString())
    return res.status(401).send('Not Allowed')
}
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json(note)
})

//4.Delete Notes
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    let note=await Notes.findById(req.params.id);
if(!note){
    return res.status(404).send('Not Found')
}
if(req.user.id!==note.user._id.toString()){
    return res.status(401).send('Not Allowed')
}
note=await Notes.findByIdAndDelete(req.params.id)
res.json({"Success":"Note has been deleted",note:note})
})
module.exports=router
