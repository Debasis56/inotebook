import React, {useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {
    Link, useLocation
  } from "react-router-dom";

import { ThemeContext } from '../App';
  
  
const Navbar = () => {
  const contest = useContext(ThemeContext);
  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    history("/login");
  }
  let location = useLocation();
  useEffect(() => {
  console.log(location.pathname)
  }, [location]);
    return (
        <nav className={`navbar navbar-expand-lg navbar-${contest.mode} bg-${contest.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home </Link>
        </li>
        <li className={`nav-item ${location.pathname==="/about"? "active":""}`}>
          <Link className="nav-link" to="/about">About</Link>
        </li>
        
        
      </ul>
      {/* <form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form> */}

<div className={`form-check form-switch custom-switch text-${
              contest.mode === "light" ? "dark" : "info"
            }`} style={{"marginRight": "20px", "marginBottom": "5px"}}>
      
      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={contest.toggleMode}/>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{fontSize: "16px"}}>Enable Dark Mode</label>
      
    </div>


      {!localStorage.getItem('token')? <form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form> : <button onClick={handleLogout} className="btn btn-primary">Log out</button>}
     


    </div>
  </div>
</nav>
    )
}

export default Navbar
