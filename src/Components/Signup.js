import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Context/alert/AlertContext'

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", confPassword: "" })
  const { showAlert } = useContext(AlertContext)

  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
    });
    let json = await response.json()
    console.log(json)
    if (json.success) {
      // Saving auth token 
      localStorage.setItem('token', json.authToken)
      navigate('/')
      showAlert(`Welcome to the family, ${user.name}`, 'success')

    }
    else {
      showAlert('Error: Couldn\'t signup :(', 'danger')

    }
  }


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1 className='mb-5'>Signup to iNotebook</h1>
      <form className='d-flex flex-column align-items-center w-50 container gap-3' onSubmit={handleSignup}>
        <div className="input-group input-group-s">
          <label className="input-group-text text-bg-secondary" htmlFor='name'>Name</label>
          <input type="text" className="form-control" aria-label="name" name='name' id='name' value={user.name} aria-describedby="inputGroup-sizing-s" onChange={onChange} required minLength={3} />
        </div>
        <div className="input-group input-group-s">
          <label className="input-group-text text-bg-secondary" htmlFor='email'>@</label>
          <input type="email" className="form-control" aria-label="email" name='email' id='email' value={user.email} aria-describedby="inputGroup-sizing-s" onChange={onChange} required />
        </div>
        <div className="input-group input-group-s">
          <label className="input-group-text text-bg-secondary" htmlFor='password'>Password</label>
          <input type="password" className="form-control" aria-label="password" name='password' id='password' value={user.password} aria-describedby="inputGroup-sizing-s" onChange={onChange} required minLength={3} />
        </div>
        <div className="input-group input-group-s">
          <label className="input-group-text text-bg-secondary" htmlFor='confPassword'>Confirm Password</label>
          <input type="password" className="form-control" aria-label="confPassword" name='confPassword' id='confPassword' value={user.confPassword} aria-describedby="inputGroup-sizing-s" onChange={onChange} required minLength={3} />
        </div>
        <button type="submit" className="btn btn-outline-primary align-self-end">Signup</button>
      </form>
    </>
  )
}

export default Signup
