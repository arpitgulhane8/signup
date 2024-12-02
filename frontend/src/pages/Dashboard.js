import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/dashboard.css";
function Dashboard() {

    const navigate = useNavigate();
    const handlelogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userinfo");

        navigate("/");
    }
 
  const user = JSON.parse(localStorage.getItem('userinfo'));

  const userName = user?.name || 'Guest';

  return (
    <div className="dashboard">
      <h1 className="dashboard_title">Welcome !! {userName}</h1>
      <button onClick={() => handlelogout()} className='logout_btn'>Logout</button>
    </div>
  );
}

export default Dashboard;
