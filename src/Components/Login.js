import React, {  useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {
   let [show,setShow]=useState(false);
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
    toast.warning('please enter correct details');
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
       <ToastContainer position="top-center" autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true} theme="colored"/> 
    <h1 className='d-flex justify-content-center my-3 ' style={{color:"purple",fontWeight:"boldest",fontFamily:"cursive"}}>Login to your account</h1>
    {  <div className='container d-flex justify-content-center my-3 ' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>
   
      <form className='form w-50 p-4  border border-white border-3' onSubmit={handleSubmit}>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <div className="mb-3 d-flex flex-row bg-secondary rounded-2 ">
          <i className="m-2 fa-solid fa-envelope"></i>
          <input required type="email" name='email' value={detail.email} onChange={onchange} placeholder="Please enter your email here.." className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <div className="mb-3 d-flex flex-row bg-secondary rounded-2">
        <i className="m-2 fa-solid fa-lock "></i>
          <input  required type={show? "text":"password"}  name='password' value={detail.password} onChange={onchange} className="form-control " id="exampleInputPassword1" />
             <i onClick={()=>{setShow(!show)}} className={`m-2 fa-solid ${show?"fa-eye ":"fa-eye-slash"} `}></i>
        </div>

        <button type='submit' className="btn btn-primary w-100">Submit</button>
      <span className='d-flex justify-content-center'>Not having an account? <Link  to="/signup" style={{fontStyle:"italic"}}> Create account</Link></span>  
      </form>
    </div>
}    </>

  )
}
