import React, { useState } from 'react';
import '../CSS/Register.css'; // Adjust the path if needed

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simple frontend validation
    if (!form.username || !form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }
    setMessage('Registered successfully! You can now log in.');
    setForm({ username: '', email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default Register;
