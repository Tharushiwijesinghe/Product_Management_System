import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }
    // Since no backend, simulate login success
    setMessage('Login successful!');
    setForm({ email: '', password: '' });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <Link to="/add-product"><button type="submit">Login</button></Link>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default Login;
