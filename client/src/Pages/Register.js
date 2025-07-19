import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Register.css'; // Adjust the path if needed
import '../CSS/style.css'; // Reusing styles from Login for consistency

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Simple frontend validation
    if (!form.username || !form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Registered successfully! You can now log in.');
      setForm({ username: '', email: '', password: '' });
    } else {
      setMessage(`❌ ${data.message}`);
    }
  } catch (err) {
    setMessage('Registration failed');
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Register</button>
      {message && <p className="message">{message}</p>}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
};

export default Register;
