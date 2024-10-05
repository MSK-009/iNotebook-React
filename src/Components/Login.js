import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../Context/alert/AlertContext'


const Login = () => {
  const [ credentials, setCredentials ] = useState( { email: "", password: "" } )
  const { showAlert } = useContext( AlertContext )

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    let json = await response.json()
    console.log(json)
    if (json.success){
      // Saving auth token 
      localStorage.setItem('token', json.authToken)
      showAlert( `Welcome back ${credentials.email}`, 'success' )
      navigate('/')
    }
    else{ 
      showAlert( `Error: Sorry, Couldn't login :(`, 'danger' ) 
    }
    

  }

  const onChange = ( e )=>{
    setCredentials( { ...credentials, [e.target.name]: e.target.value } )
  }
  return (
    <>
    <h1>LOGIN to continue to iNotebook</h1>
    <form onSubmit={ handleLogin }>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={ credentials.email } onChange={ onChange }/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" aria-label='password' name='password' value={ credentials.password } onChange={ onChange }/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}

export default Login
