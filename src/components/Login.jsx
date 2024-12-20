import { useState,useEffect } from 'react'
import {  login } from '../services'
import  {useNavigate} from 'react-router-dom'

function Login() {
  const navigate=useNavigate();
  useEffect(() =>{
    const token=localStorage.getItem('token')
    if(token){
      navigate('/home')
    }
  },[])
  

  const [loginformData, setLoginformData] = useState({
    email: '',
    password: '',
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(loginformData)
    if (res.status === 200) {
      const data=await res.json()
      console.log(data)
      //before moving to next page we are storing token in local storage
      localStorage.setItem('token',data.token)
      alert('logged in successfully')
      navigate('/home') //when logged in move to homepage
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

