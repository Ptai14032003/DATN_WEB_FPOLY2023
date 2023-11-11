import React from 'react'


const Signup = () => {
  return (
    <div className='User-box'>
        <div className="Form">
        <form action="">
        <h1>Signup</h1>

        <div className="input-box">
          <input type="text" placeholder="username" required />
        </div>
        <div className="input-box">
          <input type="password" placeholder="password" required />
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn">Login</button>

        <div className="register-link">
          <p>Are you have an account? <a href="signin">Signin here!</a></p>
        </div>
      </form>
        </div>
    </div>
  )
}

export default Signup