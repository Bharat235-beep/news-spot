import React, {  useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  
  let navigate = useNavigate()
  
  let [detail, setDetail] = useState({ email: "", password: "" });
 
  const onchange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  const handleSubmit =async (e) => {
   e.preventDefault();
    console.log(detail)
    setDetail({ email: "", password: "" })
    try{ const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:detail.email,password:detail.password}),
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
  //  let result=  login(detail.email, detail.password)
  //  if (!result) {

  //   alert('please enter correct details')
  // }
  // else {
  //   console.log("result"+result)
  //   setTimeout(()=>{navigate('/')},500)
    
  // }
  }
  useEffect(()=>{
if(localStorage.getItem('NewsSpot-token')){

navigate('/');
}
  })

  return (
    <>  
    <h1 className='d-flex justify-content-center my-3' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>Login to your account</h1>
    {  <div className='container d-flex justify-content-center my-3 ' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>
   
      <form className='w-50 p-2' onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input required type="email" name='email' value={detail.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input required type="password" name='password' value={detail.password} onChange={onchange} className="form-control" id="exampleInputPassword1" />
        </div>

        <button type='submit' className="btn btn-primary">Submit</button>
        <Link className='d-flex justify-content-center' to="/signup" style={{fontStyle:"italic"}}>Not having an account? Create account</Link>
      </form>
    </div>
}    </>

  )
}
