-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Jun 2024 pada 16.54
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 7.4.30

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
-- Struktur dari tabel `user`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `nama_depan`, `nama_belakang`, `email`, `password`, `no_tlpn`, `update_time`, `last_login`, `create_time`, `role`) VALUES
(12, 'edrick', 'hansss', 'edrick@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 123458, '2024-06-11 10:51:56', '2024-06-11 21:52:03', '2024-05-21 10:36:06', '2'),
(14, 'Edrick', 'hanitio', 'edrickhans@gmail.com', '0024ebc11c624a51e57ec00b8c3e4711dd649dafe040d9bf13aa5fcb53a2291d729f79fdbf0e8a41e92859ed2b07f45b332d84d1209441cfd0532c35f78a3edb', 1234567890, '2024-06-08 09:44:21', '2024-06-08 09:40:06', '2024-05-22 09:59:31', '1'),
(17, 'Edricksuperadmin', '.', 'esp@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2147483647, '2024-05-30 10:26:00', '2024-06-11 10:27:01', '2024-05-30 10:10:17', '4'),
(18, 'pemilik', '.', 'edrick3@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2147483647, '2024-05-30 10:26:03', '2024-06-01 11:32:44', '2024-05-30 10:11:14', '3'),
(21, 'Edrick', 'Hanitio', '0308210038@student.uph.edu', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 2147483647, '2024-06-06 10:36:57', '2024-06-06 10:36:36', '2024-06-04 10:55:09', '1'),
(25, 'Edrick', 'Hanitio', '030822038@gmail.com.edu', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 123456789, '2024-06-08 11:18:15', '2024-06-10 10:03:35', '2024-06-08 09:52:30', '1'),
(29, 'edrick', 'hans', 'edr@gmail.com', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 2147483647, '2024-06-11 21:51:08', '2024-06-11 21:49:05', '2024-06-11 10:26:00', '1'),
(30, 'edr', 'hans', 'edri@gmail.com', '2ca575972dee995dfba4728530b148422f5e40bbc1a3d34ef572e15cb117321185caec8516d4b58f3f34a23abf81f5fef52f9b6208670a7fd3cf15fc1b8fcd23', 2147483647, NULL, NULL, '2024-06-11 20:57:21', '1');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
