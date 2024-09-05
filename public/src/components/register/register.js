import React, { useState } from "react";
import './register.css';

function RegisterPage() {
    // State variables to manage form data and error message
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifypassword] = useState('');
    const [error, setError] = useState('');

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== verifypassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            // Make the POST request to register the user
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, password_confirm: verifypassword }),
            });

            // Handle successful registration
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.access); // Store access token in localStorage
                localStorage.setItem('refreshToken', data.refresh); // Store refresh token in localStorage
                console.log('Registration successful!');
                window.location.href = '/'; // Redirect to home page after successful registration
            } else {
                // Handle registration errors
                const errorData = await response.json();
                setError(errorData.detail || 'Registration failed!');
            }
        } catch (error) {
            setError('An error occurred during registration.'); // Handle network or other unexpected errors
        }
    };

    return (
        <div>
            <form className="register-background" onSubmit={handleSubmit}>
                <div className="register-panel">
                    <h1 className="register-title">Register</h1>
                    {error && <div className="error-message">{error}</div>}
                    
                    {/* Input for username */}
                    <input
                        type="text"
                        className="register-input"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {/* Input for email */}
                    <input
                        type="email"
                        className="register-input"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Input for password */}
                    <input
                        type="password"
                        className="register-input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Input for confirming password */}
                    <input
                        type="password"
                        className="register-input"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={verifypassword}
                        onChange={(e) => setVerifypassword(e.target.value)}
                    />

                    {/* Submit button */}
                    <button type="submit" className="register-button">Sign Up</button>

                    {/* Button to redirect to the login page */}
                    <button 
                        type="button" 
                        className="login-button2" 
                        onClick={() => window.location.href = '/login'}>
                        Got an account? Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
