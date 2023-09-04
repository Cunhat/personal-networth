CREATE TABLE `Balance` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` double NOT NULL,
  `accountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Balance_accountId_idx` (`accountId`),
  KEY `Balance_userId_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
