import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ResetPassword from './components/ResetPassword';
import JuniorSuite from './components/RoomDetails/JuniorSuite';
import SuperiorRoom from './components/RoomDetails/SuperiorRoom';
import GardenRoom from './components/RoomDetails/GardenRoom';
import SmallRoom from './components/RoomDetails/SmallRoom';
import SeaViewRoom from './components/RoomDetails/SeaViewRoom';
import StandardRoom from './components/RoomDetails/StandardRoom';
import WorkerStatistics from './components/WorkerStatistics';
import ManagerDashboard from './components/ManagerDashboard';
import OwnerDashboard from './components/OwnerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/room/junior-suite" element={<JuniorSuite />} />
          <Route path="/room/superior-room" element={<SuperiorRoom />} />
          <Route path="/room/standard-room" element={<StandardRoom />} />
          <Route path="/room/sea-view-room" element={<SeaViewRoom />} />
          <Route path="/room/garden-room" element={<GardenRoom />} />
          <Route path="/room/small-room" element={<SmallRoom />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/worker-statistics" element={<WorkerStatistics />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
