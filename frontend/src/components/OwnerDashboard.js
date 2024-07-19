import React, { useState, useEffect } from 'react';
import './OwnerDashboard.scss';

const roomPrices = [
    { type: 'Junior Suite', pricePerNight: 70.00 },
    { type: 'Garden Room', pricePerNight: 130.00 },
    { type: 'Sea View Room', pricePerNight: 140.00 },
    { type: 'Small Room', pricePerNight: 70.00 },
    { type: 'Standard Room', pricePerNight: 90.00 },
    { type: 'Superior Room', pricePerNight: 160.00 },
];

function OwnerDashboard() {
    const [clientData, setClientData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    const [managerData, setManagerData] = useState([]);
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/backend/getClients.php')
            .then(response => response.json())
            .then(data => setClientData(data.clients || []))
            .catch(error => console.error('Error fetching client data:', error));

        fetch('http://localhost/backend/getWorkers.php')
            .then(response => response.json())
            .then(data => setWorkerData(data.workers ? data.workers.map(worker => ({
                ...worker,
                wage: parseFloat(worker.wage),
                wage_paid: !!worker.wage_paid
            })) : []))
            .catch(error => console.error('Error fetching worker data:', error));

        fetch('http://localhost/backend/getManagers.php')
            .then(response => response.json())
            .then(data => {
                const initialManagerData = data.managers ? data.managers.map(manager => ({
                    ...manager,
                    wage: parseFloat(manager.wage),
                    wage_paid: localStorage.getItem(`manager_${manager.id}`) === 'true'
                })) : [];
                setManagerData(initialManagerData);
            })
            .catch(error => console.error('Error fetching manager data:', error));

        fetch('http://localhost/backend/getBookings.php')
            .then(response => response.json())
            .then(data => setBookingData(data.bookings || []))
            .catch(error => console.error('Error fetching booking data:', error));
    }, []);

    const handleWagePaidChange = (id, isChecked, type) => {
        const url = type === 'manager' ? 'http://localhost/backend/updateManagerWageStatus.php' : 'http://localhost/backend/updateWageStatus.php';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, wage_paid: isChecked })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (type === 'manager') {
                        setManagerData(prevManagerData =>
                            prevManagerData.map(manager =>
                                manager.id === id ? { ...manager, wage_paid: isChecked } : manager
                            )
                        );
                        localStorage.setItem(`manager_${id}`, isChecked.toString());
                    } else {
                        setWorkerData(prevWorkerData =>
                            prevWorkerData.map(worker =>
                                worker.id === id ? { ...worker, wage_paid: isChecked } : worker
                            )
                        );
                    }
                }
            })
            .catch(error => console.error(`Error updating ${type} wage status:`, error));
    };

    const calculateTotalPrice = (roomType, checkinDate, checkoutDate) => {
        const room = roomPrices.find(r => r.type === roomType);
        if (!room) return 0;

        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);

        return nights * room.pricePerNight;
    };

    return (
        <div className="owner-dashboard">
            <h3>BREEZE HOTEL</h3>
            <div className="ratings">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} width="25" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 11 0 L 13.09 6.79 L 20 7.64 L 15 12.12 L 16.18 19 L 11 15.9 L 5.82 19 L 7 12.12 L 2 7.64 L 8.91 6.79 Z" fill="#EEC600" strokeWidth="0.5" />
                    </svg>
                ))}
            </div>
            <h1>Owner Dashboard</h1>

            <h2>Manager Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Shift</th>
                        <th>Wage</th>
                        <th>Wage Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {managerData.length > 0 ? managerData.map(manager => (
                        <tr key={manager.id}>
                            <td>{manager.username}</td>
                            <td>{manager.shift}</td>
                            <td>${manager.wage.toFixed(2)}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={manager.wage_paid}
                                    onChange={(e) => handleWagePaidChange(manager.id, e.target.checked, 'manager')}
                                />
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">No manager data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Worker Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Shift</th>
                        <th>Wage</th>
                        <th>Wage Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {workerData.length > 0 ? workerData.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.username}</td>
                            <td>{worker.shift}</td>
                            <td>${worker.wage.toFixed(2)}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={worker.wage_paid}
                                    onChange={(e) => handleWagePaidChange(worker.id, e.target.checked, 'worker')}
                                />
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">No worker data available</td>
                        </tr>
                    )}
                </tbody>
            </table>


            <h2>Room Types and Prices</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Room Type</th>
                        <th>Price Per Night</th>
                    </tr>
                </thead>
                <tbody>
                    {roomPrices.map((room, index) => (
                        <tr key={index}>
                            <td>{room.type}</td>
                            <td>${room.pricePerNight.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <h2>Booking Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Room Type</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData && bookingData.length > 0 ? (
                        bookingData.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.room_type}</td>
                                <td>{booking.checkin_date}</td>
                                <td>{booking.checkout_date}</td>
                                <td className="bold-total-price">${calculateTotalPrice(booking.room_type, booking.checkin_date, booking.checkout_date).toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No booking data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OwnerDashboard;
