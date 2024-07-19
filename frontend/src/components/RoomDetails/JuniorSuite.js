import React, { useState, useEffect } from 'react';
import DateInputSection from './DateInputSection';
import './RoomDetails.scss';

function Lightbox({ imageUrl, onClose }) {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <img src={imageUrl} alt="Room Image" />
            </div>
        </div>
    );
}

function JuniorSuite() {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showLightbox, setShowLightbox] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');

    const openLightbox = (imageUrl) => {
        setLightboxImage(imageUrl);
        setShowLightbox(true);
    };

    const closeLightbox = () => {
        setShowLightbox(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBooking = async () => {
        const isConfirmed = window.confirm('Are you sure you want to make a reservation?');

        if (!isConfirmed) {
            return;
        }

        setMessage('');
        setIsError(false);

        const user_id = 1;
        const room_type = 'Junior Suite';

        try {
            const response = await fetch('http://localhost/backend/bookRoom.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room_type, user_id, checkin_date: checkinDate, checkout_date: checkoutDate })
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
            } else {
                setMessage(result.message);
                setIsError(true);
            }
        } catch (error) {
            console.error("Error during booking:", error);
            setMessage("There was an error with booking.");
            setIsError(true);
        }
    };

    return (
        <div className="room-details">
            <div className='grid-container'>
                <div className='room-type'>
                    <h3>BREEZE HOTEL</h3>
                    <div className="ratings">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 11 0 L 13.09 6.79 L 20 7.64 L 15 12.12 L 16.18 19 L 11 15.9 L 5.82 19 L 7 12.12 L 2 7.64 L 8.91 6.79 Z" fill="#EEC600" strokeWidth="0.5" />
                            </svg>
                        ))}
                    </div>
                    <h1>Junior Suite</h1>
                    <p><span className='price'>$70.00</span> per Night</p>
                </div>
                <div className='booking-date'>
                    <DateInputSection
                        checkinDate={checkinDate}
                        checkoutDate={checkoutDate}
                        setCheckinDate={setCheckinDate}
                        setCheckoutDate={setCheckoutDate}
                    />
                    <br />
                    <button onClick={handleBooking}>Book</button>
                    {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
                </div>
            </div>
            <div className='img-container'>
                <img src='/images/room-1.jpeg' alt="Junior Suite" />
                <div className='room-description'>
                    <h2>Room Amenities</h2>
                    <div className='amenities'>
                        <div className='items'>
                            <ul>
                                <li>Central A/C</li>
                                <li>1 double bed</li>
                                <li>Daily room cleaning</li>
                                <li>Telephone</li>
                                <li>Balcony</li>
                            </ul>
                            <ul>
                                <li>Free wi-fi connection</li>
                                <li>Smart TV</li>
                                <li>Daily room cleaning</li>
                                <li>Coffee set</li>
                                <li>24/7 room service (Paid)</li>
                            </ul>
                            <ul>
                                <li>20 m²</li>
                                <li>Minibar stocked </li>
                                <li>Free electronic safe</li>
                                <li>Hair dryer</li>
                                <li>Shower</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='room-images'>
                <img src='/images/room-1(2).jpeg' alt="Junior Suite" onClick={() => openLightbox('/images/room-1(2).jpeg')} />
                <img src='/images/room-1(3).jpeg' alt="Junior Suite" onClick={() => openLightbox('/images/room-1(3).jpeg')} />
                <img src='/images/room-1(4).jpeg' alt="Junior Suite" onClick={() => openLightbox('/images/room-1(4).jpeg')} />
                <img src='/images/room-1(5).jpeg' alt="Junior Suite" onClick={() => openLightbox('/images/room-1(5).jpeg')} />
            </div>

            {showLightbox && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} />}
        </div>
    );
}

export default JuniorSuite;
