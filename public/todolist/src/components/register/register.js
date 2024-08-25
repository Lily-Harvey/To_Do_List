import React from "react";
import './register.css';
import NavBar from "../nav/nav";

function RegisterPage() {
    return (
        <div>
            <NavBar />
            <div className="register-background">
                <div className="register-panel">
                    <h1 className="register-title">Register</h1>
                    <input
                        type="text"
                        className="register-input"
                        id="username"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        className="register-input"
                        id="email"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        className="register-input"
                        id="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        className="register-input"
                        id="confirm-password"
                        placeholder="Confirm Password"
                    />
                    <button className="register-button">Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
