import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';
import '../CSS/style.css'; // Reusing styles from Register for consistency


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }
 try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setMessage('✅Login successful!');
      setForm({ email: '', password: '' });
      window.location.href = '/add-product';
    } else {
      setMessage(`❌ ${data.message}`);
    }
  } catch (err) {
    setMessage('Login failed');
  }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <button className="login-button" type="submit">Login</button>
      {message && <p className="message">{message}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </form>
  );
};

export default Login;
