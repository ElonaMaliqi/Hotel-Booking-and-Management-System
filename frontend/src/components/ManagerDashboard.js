import React, { useState, useEffect } from 'react';
import './ManagerDashboard.scss';

function ManagerDashboard() {
    const [clientData, setClientData] = useState([]);
    const [workerData, setWorkerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/backend/getClients.php')
            .then(response => response.json())
            .then(data => setClientData(data.clients))
            .catch(error => console.error('Error fetching client data:', error));

        fetch('http://localhost/backend/getWorkers.php')
            .then(response => response.json())
            .then(data => setWorkerData(data.workers.map(worker => ({
                ...worker,
                wage: Number(worker.wage),
                wage_paid: !!worker.wage_paid
            }))))
            .catch(error => console.error('Error fetching worker data:', error));
    }, []);

    const handleWagePaidChange = (workerId, isChecked) => {
        fetch('http://localhost/backend/updateWageStatus.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: workerId, wage_paid: isChecked })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setWorkerData(prevWorkerData =>
                        prevWorkerData.map(worker =>
                            worker.id === workerId ? { ...worker, wage_paid: isChecked } : worker
                        )
                    );
                }
            })
            .catch(error => console.error('Error updating wage status:', error));
    };

    return (
        <div className="manager-dashboard">
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
            <h1>Manager Dashboard</h1>

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
                    {workerData.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.username}</td>
                            <td>{worker.shift}</td>
                            <td>${worker.wage.toFixed(2)}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={worker.wage_paid}
                                    onChange={(e) => handleWagePaidChange(worker.id, e.target.checked)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default ManagerDashboard;
