-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2022 at 08:04 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_email` varchar(200) NOT NULL,
  `admin_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_email`, `admin_password`) VALUES
('admin@admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `category`) VALUES
(2, 0, 'shoes'),
(3, 0, 'clothes'),
(4, 2, 'nike'),
(5, 2, 'puma'),
(6, 3, 'jeans'),
(9, 2, 'sparx'),
(10, 2, 'Adidas'),
(12, 4, 'Air Jordan');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `coupon_name` varchar(255) NOT NULL,
  `coupon_code` varchar(255) NOT NULL,
  `coupon_value` varchar(255) NOT NULL,
  `coupon_start` date NOT NULL,
  `coupon_end` date NOT NULL,
  `coupon_limit` int(11) NOT NULL,
  `coupon_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `coupon_name`, `coupon_code`, `coupon_value`, `coupon_start`, `coupon_end`, `coupon_limit`, `coupon_status`) VALUES
(2, 'new coupon', 'code-123', '50', '2022-01-06', '2022-01-07', 4, 0),
(3, 'new one', 'code-1001', '30', '2005-01-22', '2005-01-22', 3, 1),
(4, 'coupon 4', 'code-11', '15', '2005-01-22', '2005-01-22', 5, 1),
(5, 'test2', 'code-20', '20', '2006-01-22', '2006-01-22', 2, 1),
(6, 'test3', 'code-35', '35', '2022-01-01', '2022-01-22', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_numbers` int(11) NOT NULL,
  `txn_id` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `item_price` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `item_numbers`, `txn_id`, `payment_status`, `item_price`, `currency`, `created_at`) VALUES
(1, 2, 1, 'txn_3KDBifIVjnoXHCP61z0HusCq', 'succeeded', '100', 'usd', '2001-01-22 06:50:19'),
(4, 2, 1, 'txn_3KDC3mIVjnoXHCP62KFMnK3A', 'succeeded', '223', 'usd', '2001-01-22 07:12:07'),
(6, 2, 1, '746446857X049705J', 'COMPLETED', '200', 'usd', '2001-01-22 08:15:12'),
(7, 2, 1, 'txn_3KDD6CIVjnoXHCP61Zv2q3MX', 'succeeded', '108', 'usd', '2001-01-22 08:18:43'),
(8, 2, 1, '45036399BN019221U', 'COMPLETED', '246', 'usd', '2001-01-22 08:23:20'),
(9, 3, 1, 'txn_3KDDHEIVjnoXHCP60jg9Ik6d', 'succeeded', '337.69', 'usd', '2001-01-22 08:30:05'),
(10, 3, 1, 'txn_3KDDSpIVjnoXHCP61cPVLui0', 'succeeded', '488.07', 'usd', '2001-01-22 08:42:04'),
(11, 4, 1, 'txn_3KFEI9IVjnoXHCP60ztRoz2l', 'succeeded', '73', 'usd', '2007-01-22 02:29:22'),
(12, 2, 1, 'txn_3KHY7aIVjnoXHCP61OUpdMYR', 'succeeded', '1551.03', 'usd', '2013-01-22 07:34:04');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `product_id`, `order_id`, `user_id`, `quantity`) VALUES
(1, 1, 1, 2, 1),
(10, 1, 4, 2, 1),
(11, 46, 4, 2, 1),
(13, 1, 6, 2, 1),
(14, 1, 7, 2, 1),
(15, 46, 8, 2, 2),
(16, 46, 9, 3, 1),
(17, 1, 9, 3, 1),
(18, 1, 10, 3, 1),
(19, 46, 10, 3, 3),
(20, 1, 11, 4, 1),
(21, 3, 12, 2, 1),
(22, 1, 12, 2, 1),
(23, 7, 12, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_discription` varchar(255) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_category` int(11) NOT NULL,
  `product_subcategory` int(11) NOT NULL,
  `product_nestedcategory` int(11) NOT NULL,
  `product_status` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `barcode` varchar(2666) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_discription`, `product_price`, `product_image`, `product_quantity`, `product_category`, `product_subcategory`, `product_nestedcategory`, `product_status`, `created`, `modified`, `barcode`) VALUES
(1, 'air jordan', 'Air jordan is a generic name for cheap black rubber shoes that are usually made in Malaysia.', '100', '61d066b6a7630.jpeg', 4, 2, 4, 0, 1, '2023-12-21 11:31:48', '2022-01-13 18:34:04', ''),
(3, 'Adidas Kampung', 'Adidas Kampung is a generic name for cheap black rubber shoes that are usually made in Malaysia.', '200', '61d266990fc2a.jpeg', 4, 2, 10, 0, 1, '2023-12-21 11:48:09', '2022-01-13 18:34:04', ''),
(6, 'Nike Airmax Master', 'NIKE AIRMAX 270 REACT WORLDWIDE', '27.99', '61d0672c25cba.jpeg', 0, 2, 4, 0, 1, '2028-12-21 11:02:38', '2001-01-21 22:07:32', ''),
(7, 'Puma RS-X3', 'Puma SE, branded as Puma, is a German multinational corporation that designs and manufactures athletic', '1201', '61d06738eb980.jpeg', 4, 2, 5, 0, 1, '2028-12-21 12:29:19', '2022-01-13 18:34:04', ''),
(8, 'Puma Suede Classic', 'Puma SE, branded as Puma, is a German multinational corporation that designs and manufactures athletic', '1200', '61d0687141e59.jpeg', 0, 2, 5, 0, 1, '2028-12-21 12:29:46', '2001-01-21 22:12:57', ''),
(9, 'Puma RS-X3 Puzzle', 'Puma SE, branded as Puma, is a German multinational corporation that designs and manufactures athletic', '244', '61d068ae218ff.jpeg', 0, 2, 5, 0, 1, '2028-12-21 12:54:26', '2001-01-21 22:13:58', ''),
(46, 'Nike SuperRep Go', 'Nike SuperRep GoNike SuperRep GoNike SuperRep Go', '123', '61d00784719ba.jpeg', 8, 2, 4, 0, 1, '2001-01-22 08:49:24', '2022-01-01 19:42:04', ''),
(50, 'asdasdd', 'lkjlklkjkljlk', '1', '61d282367b315.png', 1, 2, 4, 0, 1, '2003-01-22 05:57:26', '2003-01-22 00:27:26', '098110104321144655.svg'),
(51, 'test', 'test', '123', '61d2dabf4c338.png', 1, 2, 4, 12, 1, '2003-01-22 12:15:11', '2003-01-22 06:45:11', '09812310104323411155.svg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `user_name` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `status`, `created_at`, `feedback`, `user_name`) VALUES
(16, 46, 3, 4, 1, '2006-01-22 02:01:02', 'Nice book explained in simplified method surely it will bring meaningful changes in your lifestyle which you always dream off Beat of luck coach you are great continue bringing great stuffs', 'mohit'),
(18, 1, 3, 3, 1, '2007-01-22 05:44:37', 'Air jordan is a generic name for cheap black rubber shoes that are usually made in Malaysia', 'mohit'),
(19, 1, 2, 4, 1, '2007-01-22 06:09:32', '55e1c71004eedea3be2e94a8557b33691157894bc2d77156a24f249a30483c28', 'pankaj'),
(20, 1, 4, 4, 1, '2007-01-22 09:59:49', 'ir jordan is a generic name for cheap black rubber', 'pankaj');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reset` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created`, `modified`, `reset`) VALUES
(2, 'pankaj', 'mehra', 'pankaj@gmail.com', '$2y$10$ldLQnlnglJrzHoyrSnO3.Oofy2xgwq2yxI7nGHmEHr3i57BNPoFVq', '2021-12-27 09:37:15', '2007-01-22 00:38:46', '1'),
(3, 'mohit', 'joshi', 'mohit@gmail.com', '$2y$10$yu92JfQr3kBtk7l9iI1px..pLobzhB9vNR2AewBkR4yVp4/8Kv4Jq', '2021-12-28 23:22:08', '2021-12-28 17:52:08', ''),
(4, 'pankaj', 'mehra', 'pankajmehra98946@gmail.com', '$2y$10$YYtDJN2M6qX5FrLRG90j8uhIyG5pdxI8tU.7.K49DKE09nr5IrH.W', '2022-01-04 12:11:51', '2007-01-22 04:28:18', '1');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int(11) NOT NULL,
  `vendor_email` varchar(255) NOT NULL,
  `vendor_accountId` varchar(255) NOT NULL,
  `vendor_password` varchar(255) NOT NULL,
  `vendor_created_at` datetime NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendor_id`, `vendor_email`, `vendor_accountId`, `vendor_password`, `vendor_created_at`, `status`) VALUES
(4, 'pankaj123@gmail.com', 'acct_1KH2koGeyIIofjoz', 'pankaj123', '2012-01-22 10:04:19', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
