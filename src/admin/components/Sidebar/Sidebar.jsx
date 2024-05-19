import React from 'react'
import './sidebar.css'
import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Sidebar = () => {
  const {logout,auth} = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  const handleLogout = () => {
      logout();
      console.log(auth)
      navigate("/adminlogin")
  }
return (
<>
  <nav>
   
    <div className="sidebar">
      <div className="logo">
        <span className="logo-name">Online Voting System</span>
      </div>
      <div className="sidebar-content">
        <ul className="lists">
          <li className="list">
            <Link to = "/admin" className="nav-link">
              <i className="bx bx-home-alt icon"></i>
              <span className="link">Dashboard</span>
            </Link>
          </li>
          <li className="list">
            <Link to = "events" href="#" className="nav-link">
              <i className="bx bx-bar-chart-alt-2 icon"></i>
              <span className="link">Events</span>
            </Link>
          </li>
          <li className="list">
            <Link to = "notifications" className="nav-link">
              <i className="bx bx-message-rounded icon"></i>
              <span className="link">Notifications</span>
            </Link>
          </li>
          <li className="list">
            <Link to = "settings" className="nav-link">
              <i className="bx bx-cog icon"></i>
              <span className="link">Settings</span>
            </Link>
          </li>
          <li className="list">
            <a href="#" className="nav-link" onClick = {handleLogout}>
              <i className="bx bx-log-out icon"></i>
              <span className="link">Logout</span>
            </a>
          </li>
        </ul>
        
        
        
      </div>
    </div>
  </nav>
</>
)
}

export default Sidebar