import React, { useState } from 'react';
import './ResetPassword.scss';

function ResetPassword({ onCancel }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageColor('');

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageColor('red');
            return;
        }

        try {
            const response = await fetch('http://localhost/backend/reset_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, newPassword })
            });

            const result = await response.json();
            console.log("Reset Password Response:", result);

            setMessage(result.message);
            if (result.success) {
                setMessageColor('green');
                setUsername('');
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setMessageColor('red');
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            setMessage("There was an error with password reset.");
            setMessageColor('red');
        }
    };

    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
            />
            <input
                className="input-field"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="off"
            />
            <input
                className="input-field"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="off"
            />
            <button className="submit-button" type="submit">Reset Password</button>
            <p className="back-link">
                <a href="#" onClick={onCancel}>Back to Login</a>
            </p>
        </form>
    );
}

export default ResetPassword;
