import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import ResetPassword from './ResetPassword';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost/backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            console.log('Response:', response, 'Result:', result);

            if (response.ok && result.success) {
                if (result.role === 'owner') {
                    navigate('/owner-dashboard');
                } else if (result.role === 'manager') {
                    navigate('/manager-dashboard');
                } else if (result.role === 'worker') {
                    navigate('/worker-statistics');
                } else {
                    navigate('/booking');
                }

            } else {
                setErrorMessage(result.message);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("There was an error with login.");
        }
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);

    return (
        <div className='form-container'>
            {!showResetPassword ? (
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <button className="submit-button" type="submit">Login</button>
                    <p className="register-link">If you didn't register, <a href="/register">Register Now</a></p>
                    <p className="forgot-password">
                        <a href="#" onClick={() => setShowResetPassword(true)}>Forgot Password?</a>
                    </p>
                </form>
            ) : (
                <ResetPassword onCancel={() => setShowResetPassword(false)} />
            )}
        </div>
    );
}

export default Login;
