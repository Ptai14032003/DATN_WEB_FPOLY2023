import React from 'react'


const Signup = () => {
  return (
    <div className='User-box'>
      <div className="Form">
      <h1>Signup</h1>
        <form action="">

          <div className='grid grid-cols-2 gap-10'>
          <div>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Address" required />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Phone_number" required />
            </div>
          </div>
          <div>
          <div className="input-box">
            <input type="text" placeholder="Birthday" required />
          </div>
          <div className="input">
            <select name="Gender" id="">
              <option value="" hidden>Gender</option>
              <option value="Nam" className='bg-black'>Nam</option>
              <option value="Nữ" className='bg-black'>Nữ</option>
            </select>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm password" required />
          </div>

          </div>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn">Signup</button>

          <div className="register-link">
            <p>Are you have an account? <a href="signin">Signin here!</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup