import { useState } from 'react'
import { register } from '../services';

function Register() {
    const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  })
  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await register(formData) //
    if (res.status === 200) {
      alert('registered successfully')
    }
    else {
      console.log(res)
      alert('error')
    }
  }
  return (
    <div>
    <form onSubmit={handleRegister}>
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.name} name="name" placeholder="enter name" />
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.mobile} name="mobile" placeholder="enter mobile" />
        <input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.email} name="email" placeholder="enter email" />
        <input type="password" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.password} name="password" placeholder="enter password" />
        <button type="submit">submit</button>
      </form>
      </div>
  )
}

export default Register;