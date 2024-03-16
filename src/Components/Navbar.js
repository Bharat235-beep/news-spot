import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
export default function Navbar(props)  {
  let {setSearch}=props
  let [nsearch,setNsearch]=useState("")
  const navigate= useNavigate()
  const handleChange=(e)=>{

   setNsearch(e.target.value)
   
  }
  const handleSearch=async(e)=>{
await setSearch(nsearch)
setNsearch("")
navigate("/search")
e.preventDefault()
  }
    return (
      <div className='container' style={{marginTop:"90px"}}>
           <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsSpot</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">About</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/category" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/category/science">Science</Link></li>
            <li><Link className="dropdown-item" to="/category/sports">Sports</Link></li>
            {/* <li><hr className="dropdown-divider"/></li> */}
            <li><Link className="dropdown-item" to="/category/entertainment">Entertainment</Link></li>
            <li><Link className="dropdown-item" to="/category/business">Business</Link></li>
            <li><Link className="dropdown-item" to="/category/health">Health</Link></li>
            <li><Link className="dropdown-item" to="/category/technology">Technology</Link></li>
          </ul>
        </li>
        
      </ul>
      <form onSubmit={handleSearch} className="d-flex">
        <input className="form-control me-2" value={nsearch} onChange={handleChange} type="text" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success"type='submit'  >Search</button>
      </form>
    </div>
  </div>
</nav>
      </div>
    )
  
}
