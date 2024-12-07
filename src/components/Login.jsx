import { useState } from 'react'
import {  login } from '../services'

function Login() {
  const [loginformData, setLoginformData] = useState({
    email: '',
    password: '',
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(loginformData)
    if (res.status === 200) {
      alert('logged in successfully')
    }
    else {
      console.log(res)
      alert('error')
    }
  }
  return (
    <div>
       <form onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.email} name="email" placeholder="enter email" />
        <input type="password" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.password} name="password" placeholder="enter password" />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login;

