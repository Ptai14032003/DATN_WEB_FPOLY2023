import React from 'react'

type Props = {}

const ForgotPassword = (props: Props) => {
  return (
    <div className='User-box'>
      <div className="FormSignin">
        <form action="">
          <h1>Quên mật khẩu</h1>
          <div className="input-box">
            <input type="email" placeholder="email"/>
          </div>
          <button type="submit" className="btn">Lấy lại mật khẩu</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword