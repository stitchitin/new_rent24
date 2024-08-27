-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 27, 2024 at 05:21 PM
-- Server version: 8.0.37-0ubuntu0.22.04.3
-- PHP Version: 8.1.2-1ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent24`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `add_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `add_date`) VALUES
(1, 'Accomodation', '2024-05-21 06:50:30'),
(2, 'EventCenter', '2024-05-21 06:50:30'),
(3, 'Fashion', '2024-05-21 12:28:00'),
(4, 'construction', '2024-05-21 15:07:18'),
(5, 'Cars', '2024-06-21 14:17:00');

-- --------------------------------------------------------

--
-- Table structure for table `ItemImage`
--

CREATE TABLE `ItemImage` (
  `id` int NOT NULL,
  `RentalItem_id` int DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `ItemImage`
--

INSERT INTO `ItemImage` (`id`, `RentalItem_id`, `ImagePath`) VALUES
(1, 1, '/rent24ng/backend/inc/uploads/rental_items/66597bd73893d_6658b63b22a7c_16.jpg'),
(2, 2, '/rent24ng/backend/inc/uploads/rental_items/6659fea9db787_16.jpg'),
(3, 3, '/rent24ng/backend/inc/uploads/rental_items/66759e746d22a_2021-Mercedes-Benz-E-Class-E300-sedan-black-James-Cleary-1001x565p-ezgif.com-webp-to-jpg-converter.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `RentalItem`
--

CREATE TABLE `RentalItem` (
  `ItemID` bigint UNSIGNED NOT NULL,
  `ItemName` varchar(255) DEFAULT NULL,
  `category` varchar(11) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) DEFAULT NULL,
  `Status` varchar(8) DEFAULT 'Pending',
  `Availability` varchar(200) DEFAULT 'Not Available',
  `user_id` int NOT NULL,
  `Video` varchar(255) DEFAULT NULL,
  `number_of_items` int DEFAULT '1',
  `location` varchar(200) NOT NULL,
  `slogo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `RentalItem`
--

INSERT INTO `RentalItem` (`ItemID`, `ItemName`, `category`, `Description`, `Price`, `Status`, `Availability`, `user_id`, `Video`, `number_of_items`, `location`, `slogo`) VALUES
(1, 'City Way', '1', 'City', 50000.00, 'Pending', 'Available', 1, 'https://www.youtube.com/watch?v=7_29vB7_lBs', 100, 'Awka', ''),
(2, 'City Way', '1', 'City way', 50000.00, 'Pending', 'Available', 3, 'https://www.youtube.com/watch?v=dbwEBCdW_dA', 100, 'Awka', 'City Way-3'),
(3, 'Mercedes', '5', 'Whatever', 5000.00, 'Pending', 'Available', 7, 'https://www.youtube.com/watch?v=7_29vB7_lBs', 12, 'Abuja', 'Mercedes-7');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `privilege` enum('user','vendor','admin') DEFAULT 'user',
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `privilege`, `registration_date`) VALUES
(1, 'stitchitin', 'stitchitin@gmail.com', '$2y$10$S9/Aphf3J1Y.iJfnT78FZuaSbMxjyztEt9AVnjQSi.ehiNHI3WayO', 'user', '2024-05-14 08:30:44'),
(2, 'iamoptimistic', 'optimistic2029@gmail.com', '$2y$10$nxvdTtqiSQKzG4/vXM3X9egiKpR4VQvGyTn7qup/qyD79zqe7GXAa', 'user', '2024-05-14 14:16:57'),
(3, 'chimaamos13', 'chimaamos13@gmail.com', '$2y$10$KNjAIquvDcQ7pf51Lp/ozuhBZXaM.tQMR13Hf84jHkrmMAlpSyoWy', 'user', '2024-05-31 16:40:42'),
(4, 'Jate', 'jatehonnah@gmail.com', '$2y$10$x3o1SpPHkVaMz.wdsQVU..12otflbtSkxF.zyJCN0lLTy7y1R4V6O', 'user', '2024-06-05 15:38:28'),
(5, 'juliet', 'julietowah@gmail.com', '$2y$10$TyMZm9R8zxFhCXM6Q7rxnewgeNNYbGPpj7bF9uI0yWJ7esmclj6Ye', 'user', '2024-06-05 15:55:47'),
(6, 'Ebenezer', 'ebenezernwolisa100@gmail.com', '$2y$10$vhLu9m.p/eSSzI6VhleOiO/X5ujMD19QiZP1yjFIFwHy/ged2zLXa', 'user', '2024-06-05 15:59:42'),
(7, 'ryanzayne', 'phoenixastro978@gmail.com', '$2y$10$ql5k2TX.KSUNhO0nJHf7Z.9MyGDhbJRYD1h.wFHvBjMw2TkoOXNlO', 'vendor', '2024-06-21 15:46:17');

-- --------------------------------------------------------

--
-- Table structure for table `Vendor`
--

CREATE TABLE `Vendor` (
  `user_id` int NOT NULL,
  `status` varchar(8) DEFAULT 'Inactive',
  `profile_pic` varchar(255) DEFAULT NULL,
  `phone_number` varchar(200) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL,
  `localgovt` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `sex` char(11) CHARACTER SET utf8mb4 DEFAULT 'M',
  `birth` date DEFAULT NULL,
  `nin` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `Vendor`
--

INSERT INTO `Vendor` (`user_id`, `status`, `profile_pic`, `phone_number`, `state`, `address`, `localgovt`, `city`, `sex`, `birth`, `nin`, `firstname`, `lastname`) VALUES
(1, 'Inactive', '/rent24ng/backend/inc/uploads/profile_pics/66589179cd64b_amos.jpeg', '08082625110', 'abia', '2nd Market Ifite Awka', '', 'Awka', 'Male', '2024-05-16', '1234567890', 'Chima', 'Amos'),
(2, 'Inactive', NULL, NULL, NULL, NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL),
(3, 'Inactive', '/rent24ng/backend/inc/uploads/profile_pics/6659fdd106a84_amosid.png', '08082625110', 'anambra', '2nd Market Ifite Awka', 'Awka', 'Awka', 'Male', '2024-05-15', '1234567890', 'Chima', 'Amos'),
(4, 'Inactive', NULL, NULL, NULL, NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL),
(5, 'Inactive', NULL, NULL, NULL, NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL),
(6, 'Inactive', NULL, NULL, NULL, NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL),
(7, 'Inactive', '/rent24ng/backend/inc/uploads/profile_pics/66759db32e217_amos.jpeg', '08082625110', 'bauchi', '2nd Market Ifite Awka', 'Awka', 'Awka', 'Male', '2024-06-20', '1234567890', 'Ryan', 'Zayne');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `ItemImage`
--
ALTER TABLE `ItemImage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RentalItem`
--
ALTER TABLE `RentalItem`
  ADD PRIMARY KEY (`ItemID`),
  ADD UNIQUE KEY `ItemID` (`ItemID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `Vendor`
--
ALTER TABLE `Vendor`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ItemImage`
--
ALTER TABLE `ItemImage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RentalItem`
--
ALTER TABLE `RentalItem`
  MODIFY `ItemID` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


/* Updated info */

ALTER TABLE Vendor
ADD COLUMN `MainBalance` DECIMAL(10, 2) DEFAULT 0.00,
ADD COLUMN `BankName` VARCHAR(255),
ADD COLUMN `AccountName` VARCHAR(255),
ADD COLUMN `AccountNumber` VARCHAR(50);

CREATE TABLE `transaction` (
    `transaction_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `transaction_amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('Credited', 'Debited','Request') NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `notification` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `details` TEXT NOT NULL,
    `status` ENUM('Read', 'Unread') DEFAULT 'Unread',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
