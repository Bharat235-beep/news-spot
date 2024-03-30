import React,{useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';
export default function Signup(props) {
  let navigate=useNavigate()
    let [detail,setDetail]=useState({name:"",email:"",password:"",cpassword:""});
    const onchange = (e) => {
        setDetail({...detail,[e.target.name]:e.target.value});
    }
   const handleSubmit=async(e)=>{
    if(detail.cpassword===detail.password){
    e.preventDefault();
    console.log(detail)
    
    try{ const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:detail.name,email:detail.email,password:detail.password}),
    });
    const result=await response.json()
    console.log(result)
    
    if(result.success){
      localStorage.setItem("NewsSpot-token",result.token);
      setTimeout(()=>{navigate('/')},500)
    }
    else{
      alert('please enter correct details');
    }
    
    
  }catch(error){
    console.log(error)
  }
  setDetail({name:"",email:"",password:""})
}
else{
  alert('please enter correct details');
}
  // let result=signup(detail.name,detail.email,detail.password)
  // if(result){
  //   console.log('This is success'+result)
//   setTimeout(()=>{navigate('/')},500)
// }
   }


  return (
    <>
    <h1 className='d-flex justify-content-center my-3' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>Create account</h1>
    <div className='container d-flex justify-content-center my-3' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>
     <form className='w-50 ' onSubmit={handleSubmit}>
      <div className='mb-3'>
      <label htmlFor="name" className="form-label">Username</label>
      <input id='name' name='name'value={detail.name} onChange={onchange} className="form-control" type="text" placeholder="Please enter username here.." aria-label="default input example" minLength={5} required/>
      </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' value={detail.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" minLength={4} maxLength={15} required name='password' value={detail.password} onChange={onchange} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Comfirm Password</label>
    <input type="password" minLength={4} maxLength={15} required name='cpassword' value={detail.cpassword} onChange={onchange} className="form-control" id="exampleInputPassword2"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link className='d-flex justify-content-center' to="/login">Already have an account?</Link>
</form>
    </div>
    </>
  )
}
