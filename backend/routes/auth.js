const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET = "Bharat@24";
router.post('/createUser', [body('email').isEmail(),
 body('password').isLength({ min: 4 })], (req, res) => {

 try{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    name: req.body.name,
    password: hash,
    email: req.body.email
  }).then((user) => {
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,token})
   // res.json(user)
  })
    .catch(error => { res.status(500).json({ errror: error.message }) });

}
catch(error)
{
  console.log(error)
}
})
router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 4 })],async(req,res)=>{
  try{
    let success=false;
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body
  let user=await User.findOne({'email':email})
  if(!user){
    res.send({success,'error':"Please check your credentials"})
  }
  else{
    
     let authResult= bcrypt.compareSync(password, user.password); 
     if(!authResult){
       res.send({success,'error':"Please check your credentials"})
     }
     else{
      console.log(user)
      const data = {
        user: {
          id: user.id
        }
      }
      success=true;
      const token = jwt.sign(data, JWT_SECRET);
      res.json({'success':success,'token':token})
       
     }
    
  }}
  catch(error){
    console.log(error)
  }
});
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    let userId=req.user.id;
    const user=await User.findById(userId).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
module.exports = router