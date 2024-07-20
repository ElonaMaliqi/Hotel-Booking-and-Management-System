-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2024 at 09:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `room_type` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `room_type`, `user_id`, `checkin_date`, `checkout_date`) VALUES
(57, 'Junior Suite', 1, '2024-10-03', '2024-10-05'),
(58, 'Superior Room', 1, '2024-12-01', '2024-12-04'),
(59, 'Standard Room', 1, '2024-10-07', '2024-10-10'),
(60, 'Sea View Room', 1, '2024-12-02', '2024-12-05'),
(61, 'Small Room', 1, '2024-10-01', '2024-10-04'),
(62, 'Garden Room', 1, '2024-07-10', '2024-07-12');

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `wage` decimal(10,2) DEFAULT NULL,
  `wage_paid` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`id`, `username`, `password`, `shift`, `wage`, `wage_paid`) VALUES
(3, 'manager1', '$2y$10$dbnuK/i6fe1F3N1JDP4rIOnXN4IXJPyLUD1vvbb6TOma5PgBqE4fi', '09:00-17:00', 7000.00, 1),
(4, 'manager2', '$2y$10$crDJ/k9brrrsI5L37hbZk.7JK.LTKBimvM1S8m7v7MmSCVwVR8E/O', '14:00-22:00', 7000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `username`, `password`) VALUES
(2, 'owner', '$2y$10$ETPVvX6fz.ChiTwHFz6YNOIDB4kTgt.kfvqWNQe.dQLyKrHXOMGfq');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`) VALUES
(1, 'Elona Maliqi', 'elona@gmail.com', '$2y$10$kuhyjitMOaNSu3XS0O/HZOxbyKB9j3grUoHY.bRu6wRizsjpXlN0m', '111 111');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `shift` varchar(255) DEFAULT NULL,
  `wage` decimal(10,2) DEFAULT NULL,
  `wage_paid` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `username`, `password`, `shift`, `wage`, `wage_paid`) VALUES
(6, 'worker1', '$2y$10$as7fYaqZzGc2cbObc05c5uAlCc1VPsNelrNnuh270bNP9hb4Q3fv2', '09:00-17:00', 5000.00, 1),
(7, 'worker2', '$2y$10$KLxM9rlkLVhfENuuQPE4AeFyZ/DZf7XoGRnE8532hUgCIVZWNVONK', '15:00-22:00', 4500.00, 0),
(8, 'worker3', '$2y$10$1YP9zkir6jXyxVW1.BcJruRRRP37xgVJxElnzyiUL3BVQMIH/y9RO', '06:00-14:00', 5000.00, 1),
(9, 'worker4', '$2y$10$x20v74Ka8VBH2nY8Ls69nuDEuKh1OZS2GpTNs/wSiBnTiAJRk0BNi', '18:00-02:00', 5500.00, 0),
(10, 'worker5', '$2y$10$EP6gchp/zrfw2OelKByD5uRT7asMyf9U23yrxTn39dnXuLuORqNoi', '08:00-16:00', 4500.00, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
