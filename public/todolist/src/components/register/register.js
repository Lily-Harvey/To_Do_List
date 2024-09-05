import React, { useState } from "react";
import './register.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifypassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== verifypassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, password_confirm: verifypassword }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.access); // Store the access token
                localStorage.setItem('refreshToken', data.refresh); // Store the refresh token
                console.log('Registration successful!');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Registration failed!');
            }
        } catch (error) {
            setError('An error occurred during registration.');
        }
    };

    return (
        <div>
            <form className="register-background" onSubmit={handleSubmit}>
                <div className="register-panel">
                    <h1 className="register-title">Register</h1>
                    {error && <div className="error-message">{error}</div>}
                    <input
                        type="text"
                        className="register-input"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="register-input"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="register-input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="register-input"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={verifypassword}
                        onChange={(e) => setVerifypassword(e.target.value)}
                    />
                    <button type='submit' className="register-button">Sign Up</button>
                    <button className="login-button2" onClick={() => window.location.href = '/login'}>Got an account? Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
