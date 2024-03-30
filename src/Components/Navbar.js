import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function Navbar(props) {
  let loc=useLocation()
  let { setSearch } = props
  let [nsearch, setNsearch] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {

    setNsearch(e.target.value)

  }
  const handleLogout = () => {
    localStorage.removeItem('NewsSpot-token')
    navigate('/login');
  }
  const handleSearch = async (e) => {
    await setSearch(nsearch)
    setNsearch("")
    navigate("/search")
    e.preventDefault()
  }

  return (
    <div className='container' style={{ marginTop: "90px" }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"style={{color:'blue'}}>
           <span style={{color:'red'}}>News</span>Spot
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link style={loc.pathname!=="/"?{color:'white'}:{color:'black'}} className={`nav-link ${loc.pathname==="/"?"myactive":""}`} aria-current="page" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link style={loc.pathname==="/"?{color:'white'}:{color:'black'}} className={`nav-link ${loc.pathname==="/"?"myactive":""}`} to="/">About</Link>
              </li> */}
              <li className="nav-item">
                <Link style={loc.pathname!=="/saved-news"?{color:'white'}:{color:'black'}} className={`nav-link ${loc.pathname==="/saved-news"?"myactive":""}`} to="/saved-news">Saved News</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/category" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:'white'}}>
                  Category
                </Link>
                <ul className="dropdown-menu bg-dark"  aria-labelledby="navbarDropdown">
                  <li><Link style={loc.pathname!=="/category/science"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/science"?"myactive":""}`} to="/category/science">Science</Link></li>
                  <li><Link  style={loc.pathname!=="/category/sports"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/sports"?"myactive":""}`} to="/category/sports">Sports</Link></li>
                   {/* <li><hr className="dropdown-divider"/></li>  */}
                  <li><Link  style={loc.pathname!=="/category/entertainment"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/entertainment"?"myactive":""}`} to="/category/entertainment">Entertainment</Link></li>
                  <li><Link  style={loc.pathname!=="/category/business"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/business"?"myactive":""}`} to="/category/business">Business</Link></li>
                  <li><Link  style={loc.pathname!=="/category/health"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/health"?"myactive":""}`} to="/category/health">Health</Link></li>
                  <li><Link  style={loc.pathname!=="/category/technology"?{color:'white'}:{color:'black'}} className={`dropdown-item ${loc.pathname==="/category/technology"?"myactive":""}`} to="/category/technology">Technology</Link></li>
                </ul>
              </li>

            </ul>
            <form onSubmit={handleSearch} className="d-flex">
              <input className="form-control me-2" value={nsearch} onChange={handleChange} type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type='submit'  >Search</button>
            </form>
          </div>
        </div>
            <div className="d-grid gap-2 d-md-block d-flex flex-row-reverse">
              {!(localStorage.getItem('NewsSpot-token')) ?
                ""
                :
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
              }
            </div>
      </nav>
    </div>
  )

}
