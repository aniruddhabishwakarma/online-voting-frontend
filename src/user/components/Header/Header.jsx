import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/UserInfoProvider'
import useAuth from '../../../hooks/useAuth';

const Header = () => {
  const [userInfo] = useContext(UserContext);
 const {logout,auth} = useAuth();
 const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    console.log(auth);
  }
  
return (
<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 position-fixed w-100">
    <div className="container-fluid">
      <Link to = "/" className="navbar-brand" href="#">OVS</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item mx-3">
            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
          </li>
         
          <li className="nav-item mx-3">
            <Link to="/event" className="nav-link">Events</Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/about" className="nav-link" href="#">About</Link>
          </li>
          
           
          
        </ul>
        <ul className="navbar-nav ms-auto">
        <div class="container-fluid">
              <form class="d-flex" role="search">
                <input class="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                {/* <button class="btn btn-outline-dark" type="submit">Search</button> */}
              </form>
            </div>
            {
              userInfo ? (
                <li className="nav-item">
                <button  className="nav-link active"  onClick = {handleLogout}>Logout</button>
              </li>
              ) : (
                <li className="nav-item">
                <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
              </li>
              )
            }
          
        </ul>
      </div>
    </div>
  </nav>
</>
)
}

export default Header