import React, { useState } from "react";
import './login.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the tokens in localStorage
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                console.log('Login successful!');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed. Please check your username and password.');
            }
        } catch (error) {
            setError('An error occurred during login.');
        }
    };

    return (
        <div>
            <form className="login-background" onSubmit={handleSubmit}>
                <div className="login-panel">
                    <h1 className="login-title">Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Submit</button>
                    <button className="register-button2" onClick={() => window.location.href = '/register'}>New User? Register</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
