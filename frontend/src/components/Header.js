import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleAboutClick = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleRoomsClick = () => {
        const roomsSection = document.getElementById('rooms');
        if (roomsSection) {
            roomsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <header className='header'>
            <h2>BREEZE HOTEL</h2>
            <nav className='navbar-container'>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <a onClick={handleAboutClick}>About</a>
                    </li>
                    <li>
                        <a onClick={handleRoomsClick}>Rooms</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;