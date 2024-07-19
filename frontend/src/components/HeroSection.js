import React from 'react';
import './HeroSection.scss';


function MainSection() {
    const handleRoomsClick = () => {
        const roomsSection = document.getElementById('rooms');
        if (roomsSection) {
            roomsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className='main-container'>
            <div className='content-container'>
                <p>Welcome to</p>
                <h1>BREEZE HOTEL</h1>
                <div className='button'>
                    <button onClick={handleRoomsClick}>ACCOMODATION</button>
                </div>
            </div>
        </div>
    )
}

export default MainSection;