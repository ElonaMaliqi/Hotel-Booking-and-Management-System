import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import About from './About';
import RoomsSection from './RoomsSection';
import Footer from './Footer';

function Booking({ userId }) {
    const [roomNumber, setRoomNumber] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/backend/bookings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, room_number: roomNumber, check_in: checkIn, check_out: checkOut })
        });
        const result = await response.json();
        alert(result.message);
    };

    return (
        <>
            <Header />
            <HeroSection />
            <About />
            <RoomsSection />
            <Footer />
        </>
    );
}

export default Booking;
