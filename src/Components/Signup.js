import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Signup(props) {
  let [showPass,setShowPass]=useState(false);
  let [showCon,setShowCon]=useState(false);
  let navigate=useNavigate()
    let [detail,setDetail]=useState({name:"",email:"",password:"",cpassword:""});
    const onchange = (e) => {
        setDetail({...detail,[e.target.name]:e.target.value});
    }
   const handleSubmit=async(e)=>{
     e.preventDefault();
    if(detail.cpassword===detail.password){
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
      toast.success("Your account created successfully!!")
      setTimeout(()=>{navigate('/')},1000)
    }
    else{
      toast.error('Email already exist');
    }
    
    
    // setDetail({name:"",email:"",password:"",cpassword:""})
  }catch(error){
    console.log(error)
  }
}
else{
 toast.warning('please enter correct details');
}
  // let result=signup(detail.name,detail.email,detail.password)
  // if(result){
  //   console.log('This is success'+result)
//   setTimeout(()=>{navigate('/')},500)
// }
   }


  return (
    <>
      <ToastContainer position="top-center" autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true} theme="colored"/>
    <h1 className='d-flex justify-content-center my-3' style={{color:"purple",fontWeight:"boldest",fontFamily:"cursive"}}>Create your account</h1>
    <div className=' container d-flex justify-content-center my-3 w-75' style={{color:"white",fontWeight:"boldest",fontFamily:"cursive"}}>
     <form className='form w-50 p-4  border border-white border-3 ' onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-label">Username</label>
      <div className='mb-3 d-flex flex-row bg-secondary rounded-2'>
      <i className="m-2 fa-solid fa-user"></i>
      <input id='name' name='name'value={detail.name} onChange={onchange} className="form-control" type="text" placeholder="Please enter username here.." aria-label="default input example" minLength={5} required/>
      </div>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <div className="mb-3 d-flex flex-row bg-secondary rounded-2">
  <i className="m-2 fa-solid fa-envelope"></i>
    <input type="email" name='email' value={detail.email} onChange={onchange} className="form-control" id="exampleInputEmail1" placeholder="Please enter your email here.." aria-describedby="emailHelp" required/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <div className="mb-3  d-flex flex-row bg-secondary rounded-2">
  <i className="m-2 fa-solid fa-lock "></i>
    <input type={showPass? "text":"password"}  minLength={4} maxLength={15} required name='password' value={detail.password} onChange={onchange} className="form-control" id="exampleInputPassword1"/>
    <i onClick={()=>{setShowPass(!showPass)}} className={`m-2 fa-solid ${showPass?"fa-eye ":"fa-eye-slash"} `}></i>
  </div>
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
  <div className="mb-3  d-flex flex-row bg-secondary rounded-2">
  <i className="m-2 fa-solid fa-lock "></i>
    <input type={showCon? "text":"password"}  minLength={4} maxLength={15} required name='cpassword' value={detail.cpassword} onChange={onchange} className="form-control" id="exampleInputPassword2"/>
    <i onClick={()=>{setShowCon(!showCon)}} className={`m-2 fa-solid ${showCon?"fa-eye ":"fa-eye-slash"} `}></i>
  </div>
  
  <button type="submit" className="btn btn-primary w-100">Submit</button>
  <span className='d-flex justify-content-center'>Already have an account?<Link  to="/login">Log in</Link> </span>
</form>
    </div>
    </>
  )
}
