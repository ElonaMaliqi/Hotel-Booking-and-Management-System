import React, { useState, useEffect } from 'react';
import './WorkerStatistics.scss';

function WorkerStatistics() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [clientData, setClientData] = useState([]);



    useEffect(() => {

        fetch('http://localhost/backend/getClients.php')
            .then(response => response.json())
            .then(data => setClientData(data.clients))
            .catch(error => console.error('Error fetching client data:', error));

        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost/backend/get_statistics.php');
                const result = await response.json();

                if (result.success) {
                    setReservations(result.reservations);
                } else {
                    setErrorMessage(result.message || 'No reservations found');
                }
            } catch (error) {
                setErrorMessage('Error fetching reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="worker-statistics">
            <h3>BREEZE HOTEL</h3>
            <div class="ratings">
                <svg width="25" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 11 0
                                         L 13.09 6.79
                                         L 20 7.64
                                         L 15 12.12
                                         L 16.18 19
                                         L 11 15.9
                                         L 5.82 19
                                         L 7 12.12
                                         L 2 7.64
                                         L 8.91 6.79
                                         Z"
                        fill="#EEC600" stroke-width="0.5" />
                </svg>
                <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 11 0
                                         L 13.09 6.79
                                         L 20 7.64
                                         L 15 12.12
                                         L 16.18 19
                                         L 11 15.9
                                         L 5.82 19
                                         L 7 12.12
                                         L 2 7.64
                                         L 8.91 6.79
                                         Z"
                        fill="#EEC600" stroke-width="0.5" />
                </svg>
                <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 11 0
                                         L 13.09 6.79
                                         L 20 7.64
                                         L 15 12.12
                                         L 16.18 19
                                         L 11 15.9
                                         L 5.82 19
                                         L 7 12.12
                                         L 2 7.64
                                         L 8.91 6.79
                                         Z"
                        fill="#EEC600" stroke-width="0.5" />
                </svg>
                <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 11 0
                                         L 13.09 6.79
                                         L 20 7.64
                                         L 15 12.12
                                         L 16.18 19
                                         L 11 15.9
                                         L 5.82 19
                                         L 7 12.12
                                         L 2 7.64
                                         L 8.91 6.79
                                         Z"
                        fill="#EEC600" stroke-width="0.5" />
                </svg>
                <svg width="25" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 11 0
                                         L 13.09 6.79
                                         L 20 7.64
                                         L 15 12.12
                                         L 16.18 19
                                         L 11 15.9
                                         L 5.82 19
                                         L 7 12.12
                                         L 2 7.64
                                         L 8.91 6.79
                                         Z"
                        fill="#EEC600" stroke-width="0.5" />
                </svg>
            </div>

            <h2>Booked Rooms</h2>
            {loading ? (
                <p>Loading...</p>
            ) : errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Room Type</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res, index) => (
                            <tr key={index}>
                                <td>{res.room_type}</td>
                                <td>{res.checkin_date}</td>
                                <td>{res.checkout_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2>Client Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {clientData.map(client => (
                        <tr key={client.id}>
                            <td>{client.username}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkerStatistics;
