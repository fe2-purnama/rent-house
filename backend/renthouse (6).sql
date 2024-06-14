-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2024 at 01:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renthouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `kategori_id` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`kategori_id`, `nama_kategori`) VALUES
(1, 'Apartemen'),
(2, 'Rumah'),
(3, 'Villa');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `tgl_order` date DEFAULT curdate(),
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `harga_total` int(11) NOT NULL,
  `status` enum('Pending','Aktif','Done') DEFAULT 'Pending',
  `lama_tinggal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id`, `tgl_order`, `product_id`, `user_id`, `tanggal_selesai`, `tanggal_mulai`, `harga_total`, `status`, `lama_tinggal`) VALUES
(1, '2024-06-13', 2, 25, '2024-07-17', '2024-06-18', 700000, 'Aktif', 1),
(2, '2024-05-24', 2, 14, '2024-08-01', '2024-07-01', 600000, 'Pending', 2),
(3, '2024-05-24', 3, 30, '2024-06-15', '2024-07-14', 800000, 'Done', 3),
(6, '2024-05-28', 5, 30, '2024-07-15', '2024-06-16', 500000, 'Pending', 4),
(8, '2024-06-14', NULL, NULL, '2024-06-14', '2024-06-14', 600000, NULL, 5),
(9, '2024-06-14', 5, 30, '2024-06-15', '2024-07-14', 10000000, 'Pending', 6),
(10, '2024-06-14', 1, 36, '2024-08-15', '2024-06-15', 1400000, 'Pending', NULL),
(11, '2024-06-14', 5, 36, '2024-08-15', '2024-06-15', 20000000, 'Pending', 2),
(12, '2024-06-15', 5, 36, '2024-12-20', '2024-06-20', 60000000, 'Pending', 6);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nama_product` varchar(255) NOT NULL,
  `gambar1` varchar(255) DEFAULT NULL,
  `gambar2` varchar(255) DEFAULT NULL,
  `gambar3` varchar(255) DEFAULT NULL,
  `gambar4` varchar(255) DEFAULT NULL,
  `akses_wifi` enum('yes','no') DEFAULT 'no',
  `jumlah_kamar` int(11) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `harga` decimal(10,2) DEFAULT NULL,
  `ruang_tamu` enum('yes','no') DEFAULT 'no',
  `garasi` enum('yes','no') DEFAULT 'no',
  `no_rek` varchar(50) NOT NULL,
  `map` varchar(255) DEFAULT NULL,
  `luas_properti` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `kategori_id`, `user_id`, `nama_product`, `gambar1`, `gambar2`, `gambar3`, `gambar4`, `akses_wifi`, `jumlah_kamar`, `lokasi`, `harga`, `ruang_tamu`, `garasi`, `no_rek`, `map`, `luas_properti`) VALUES
(1, 1, 37, 'Villa Cempaka blok B', 'https://example.com/apartemen.jpg', NULL, NULL, NULL, 'yes', 2, 'Bogor', 700000.00, 'no', 'no', '', NULL, 3000),
(2, 2, 37, 'Villa Harmonis Blok A', 'https://example.com/rumah.jpg', NULL, NULL, NULL, 'no', 3, 'Bogor', 600000.00, 'no', 'no', '', NULL, 0),
(3, 3, 37, 'Villa Indah', 'https://example.com/villa.jpg', NULL, NULL, NULL, 'yes', 5, 'Bogor', 700000.00, 'no', 'no', '', NULL, 0),
(5, 3, 37, 'Rumah mewah', 'https://d3p0bla3numw14.cloudfront.net/news-content/img/2020/10/02094137/gambar-rumah-minimalis-2.jpg', 'https://2.bp.blogspot.com/-xKgI2UslkmU/VIECxyKligI/AAAAAAAAA5c/muZ3qAAm3d4/s1600/Rumah%2BIdaman%2BSederhana%2B2%2BLantai.jpg', 'http://4.bp.blogspot.com/-vBTUJW33Pmk/VLurg4yQLwI/AAAAAAAAATc/3cG-eQLGmWs/s1600/gambar-rumah%2Bsederhana-2.jpg', 'https://tse1.mm.bing.net/th?id=OIP.OBZGI2b3kic5t3GdDQbGxAHaFj&pid=Api&P=0&h=180', 'yes', 4, 'jl. kartini blok B', 10000000.00, 'yes', 'yes', '81263716237513615', 'kosong', 1200),
(6, 2, 37, 'Rumah indah ', NULL, NULL, NULL, NULL, 'yes', 2, 'bogor', 600000.00, 'no', 'no', '', NULL, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `nama_depan` varchar(100) NOT NULL,
  `nama_belakang` varchar(100) NOT NULL,
  `email` text NOT NULL,
  `password` varchar(128) NOT NULL,
  `no_tlpn` int(13) NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp(),
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nama_depan`, `nama_belakang`, `email`, `password`, `no_tlpn`, `update_time`, `last_login`, `create_time`, `role`) VALUES
(12, 'edrick', 'hansss', 'edrick@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 123458, '2024-06-11 10:51:56', '2024-06-11 21:52:03', '2024-05-21 10:36:06', '2'),
(14, 'Edrick', 'hanitio', 'edrickhans@gmail.com', '0024ebc11c624a51e57ec00b8c3e4711dd649dafe040d9bf13aa5fcb53a2291d729f79fdbf0e8a41e92859ed2b07f45b332d84d1209441cfd0532c35f78a3edb', 1234567890, '2024-06-08 09:44:21', '2024-06-08 09:40:06', '2024-05-22 09:59:31', '1'),
(17, 'Edricksuperadmin', '.', 'esp@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2147483647, '2024-05-30 10:26:00', '2024-06-11 10:27:01', '2024-05-30 10:10:17', '4'),
(18, 'pemilik', '.', 'edrick3@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2147483647, '2024-05-30 10:26:03', '2024-06-01 11:32:44', '2024-05-30 10:11:14', '3'),
(21, 'Edrick', 'Hanitio', '0308210038@student.uph.edu', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 2147483647, '2024-06-06 10:36:57', '2024-06-06 10:36:36', '2024-06-04 10:55:09', '1'),
(25, 'Edrick', 'Hanitio', '030822038@gmail.com.edu', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 123456789, '2024-06-08 11:18:15', '2024-06-10 10:03:35', '2024-06-08 09:52:30', '1'),
(29, 'edrick', 'hans', 'edr@gmail.com', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 2147483647, '2024-06-11 21:51:08', '2024-06-11 21:49:05', '2024-06-11 10:26:00', '1'),
(30, 'edr', 'hans', 'edri@gmail.com', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 2147483647, NULL, NULL, '2024-06-11 20:57:21', '1'),
(32, 'dian', 'pertiwi', 'dian@gmail.com', '785d471a4fd2c4674cd0a115adc8ac2098a2bc75fa258f921d3d977d3cada7be9348e4d31b4467e9559f50c233b9525bd73f6761ad689ae6e2cc8fedd40f3249', 821927313, NULL, NULL, '2024-06-12 04:23:19', '2'),
(33, 'Fadil', 'Fadill23', 'fadil@gmail.com', '5f3bec81b1962f0219a589271237a1cbbb96a9874ca3a27f645f19cd070804d9b0aba838ad0117e8339067e05fd5ee06ee6e22b7fcde480d1153a00a384c3d8f', 2147483647, NULL, NULL, '2024-06-12 05:15:06', '3'),
(34, 'dian', 'dianll23', 'yaaa@gmail.com', '4119ab0797bc89493e725cc77f2f8dc570e0ebe0a4fc85f44e08535a9d3d961306a26249263510babea71bdfab2e0a51bba88cedbcbe54bef9d6b157b834c184', 1836842784, NULL, '2024-06-12 05:24:00', '2024-06-12 05:22:11', '3'),
(35, 'boy', 'boyll23', 'boy@gmail.com', '4ac18f3caa407353048832a515a4283983830888de0c18a26d703f46d929d9ad05385077edd52cfa132e9706037902e287177aff5b10feeb49cf47251370bc1b', 1836842784, NULL, '2024-06-12 22:01:47', '2024-06-12 21:56:12', '3'),
(36, 'Dian', 'Pertiwi', 'dian123@gmail.com', '231f51c4189c9e6707b1b3f9ce911e65d483a23f18a1e9782616b911b5fe0fad77249daa14ce42172d5e8552c029628fdbdb9bfc6539858399c68b35ecc13754', 1836842784, NULL, '2024-06-15 07:31:03', '2024-06-13 15:27:25', '1'),
(37, 'Pemilik', 'properti', 'pemilik@gmail.com', 'dd724ffd99660cb49cda506292547882269ff3d1376612a058961609497f9981d15794952471225821172e23e705b26ee04dbc63a28e747c2cc8a6fe34e598c3', 1836842784, NULL, '2024-06-14 11:54:07', '2024-06-13 16:21:56', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`kategori_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `produk_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `kategori_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
