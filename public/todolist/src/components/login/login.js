import React, {useState} from "react";
import './login.css'
import NavBar from "../nav/nav";

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/token/',{
            method: 'POST',
            headers: {
                'content-Type': 'application/json',  
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            // Store the tokens in localStorage
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            console.log('Login successful!');
            window.location.href= '/';
        } else {
            console.log('Login failed!');
        }
    };

    return (
        <div>
            <NavBar />
            <form className="login-background" onSubmit={handleSubmit}>
                <div className="login-panel">
                    <h1 className="login-title">Login</h1>
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
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
