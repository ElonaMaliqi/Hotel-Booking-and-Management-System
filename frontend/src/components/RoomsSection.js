
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomsSection.scss';

function RoomsSection() {
    const navigate = useNavigate();

    const goToRoomDetails = (room) => {
        navigate(`/room/${room}`);
    };

    return (
        <>
            <h2 className='title' id='rooms'>Rooms & Suites</h2>
            <p className='logo'>BREEZE HOTEL</p>
            <div className='rooms-container'>
                <div className='image-text'>
                    <img src='/images/room-1.jpeg' alt="Junior Suite" />
                    <div className='image-description'>
                        <h2>Junior Suite</h2>
                        <button onClick={() => goToRoomDetails('junior-suite')}>DETAILS</button>
                    </div>
                </div>

                <div className='image-text'>
                    <img src='/images/room-2.jpeg' alt="Superior Room" />
                    <div className='image-description'>
                        <h2>Superior Room</h2>
                        <button onClick={() => goToRoomDetails('superior-room')}>DETAILS</button>
                    </div>
                </div>

                <div className='image-text'>
                    <img src='/images/room-3.jpeg' alt="Standard Room" />
                    <div className='image-description'>
                        <h2>Standard Room</h2>
                        <button onClick={() => goToRoomDetails('standard-room')}>DETAILS</button>
                    </div>
                </div>

                <div className='image-text'>
                    <img src='/images/room-4.jpeg' alt="Sea View Room" />
                    <div className='image-description'>
                        <h2>Sea View Room</h2>
                        <button onClick={() => goToRoomDetails('sea-view-room')}>DETAILS</button>
                    </div>
                </div>

                <div className='image-text'>
                    <img src='/images/room-5.jpeg' alt="Garden Room" />
                    <div className='image-description'>
                        <h2>Garden Room</h2>
                        <button onClick={() => goToRoomDetails('garden-room')}>DETAILS</button>
                    </div>
                </div>

                <div className='image-text'>
                    <img src='/images/room-6.jpeg' alt="Small Room" />
                    <div className='image-description'>
                        <h2>Small Room</h2>
                        <button onClick={() => goToRoomDetails('small-room')}>DETAILS</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomsSection;
