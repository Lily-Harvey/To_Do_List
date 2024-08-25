import React from "react";
import { useNavigate } from "react-router-dom";
import './nav.css';

function NavBar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if token exists

    return (
        <nav className="nav-bar">
            <button className="nav-button nav-home" onClick={() => navigate('/')}>
                Home
            </button>
            <div className="nav-user-container">
                {!isAuthenticated ? (
                    <>
                        <button className="nav-button nav-item nav-user" onClick={() => navigate('/login')}>
                            Sign In
                        </button>
                        <button className="nav-button nav-item nav-user" onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </>
                ) : (
                    // Optionally add authenticated user buttons here
                    <button className="nav-button nav-item nav-user" onClick={() => {
                        // Handle logout logic
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate('/login');
                    }}>
                        Log Out
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
