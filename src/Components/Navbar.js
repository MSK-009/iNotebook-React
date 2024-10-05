import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate()

  const [ user, setUser] = useState(null);

  useEffect( ()=>{
    if ( localStorage.getItem( 'token' ) ){
      const fetchUser  = async ()=>{
        const response = await fetch( 'http://localhost:5000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json()
        setUser(json.name)
      }
      fetchUser()
    }  
  } )


  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ""}`} to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/">Action</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                </ul>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div>
              <Link className={`btn btn-outline-primary mx-2 ${location.pathname === "/login" ? 'active' : ""}`} to="/login" role="button">Login</Link>
              <Link className={`btn btn-outline-success mx-2 ${location.pathname === "/signup" ? 'active' : ""}`} to="/signup" role="button">Signup</Link>
            </div>: <><div className='me-2 badge text-bg-primary py-2 border border-3 rounded-5 border-success-subtle border-top-0 border-start-0'>{ user }</div><button className='btn btn-primary mx-2' onClick={ handleLogout }>Logout</button></>}

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-info" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
