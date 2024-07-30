import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const userRole = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Port Price Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ports">
                Ports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-pricing">
                Add Pricing
              </Link>
            </li>
            {userRole === "ROLE_ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-city">
                    Add City
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-port">
                    Add Port
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-country">
                    Add Country
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register-user">
                    Register User
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
