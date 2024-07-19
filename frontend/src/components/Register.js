import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost/backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, phone })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setSuccessMessage(result.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("There was an error with registration.");
        }
    };

    return (
        <div className="form-container">
            <form className='register-form' onSubmit={handleSubmit}>
                <h2>Register</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <input className='input-field'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input className='input-field'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input className='input-field'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input className='input-field'
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button className='submit-button' type="submit">Register</button>
                <p className="login-link">Already registered? <a href="/login">Login Here</a></p>
            </form>
        </div>
    );
}

export default Register;
