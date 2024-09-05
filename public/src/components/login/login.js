import React, { useState } from "react";
import './login.css';

function LoginPage() {
    // State variables to manage form data and error messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if username and password are provided
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            // Make the POST request to get tokens
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Handle successful login
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.access); // Store access token
                localStorage.setItem('refreshToken', data.refresh); // Store refresh token
                console.log('Login successful!');
                window.location.href = '/'; // Redirect to home page after successful login
            } else {
                // Handle login errors
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed. Please check your username and password.');
            }
        } catch (error) {
            setError('An error occurred during login.'); // Handle network or other unexpected errors
        }
    };

    return (
        <div>
            <form className="login-background" onSubmit={handleSubmit}>
                <div className="login-panel">
                    <h1 className="login-title">Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    
                    {/* Input for username */}
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {/* Input for password */}
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Submit button */}
                    <button type="submit" className="login-button">Submit</button>

                    {/* Button to redirect to the registration page */}
                    <button 
                        type="button" 
                        className="register-button2" 
                        onClick={() => window.location.href = '/register'}>
                        New User? Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
