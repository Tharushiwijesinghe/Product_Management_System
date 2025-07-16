import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Product Management System</h1>
      <button className="btnStyle" onClick={() => navigate('/register')} >Register</button>
      <button className="btnStyle" onClick={() => navigate('/login')} >Login</button>
    </div>
  );
};



export default Home;
