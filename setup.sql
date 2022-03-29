DROP TABLE IF EXISTS parcels;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userName VARCHAR(25) PRIMARY KEY,
  password VARCHAR(70) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  userType VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE parcels (
  trackingNumber VARCHAR(36) PRIMARY KEY,
  senderAddress VARCHAR(500) NOT NULL, 
  destinationAddress VARCHAR(500) NOT NULL,
  destinationLat Decimal(8,6) NOT NULL,
  destinationLng Decimal(9,6) NOT NULL,
  kgs tinyint NOT NULL,
  parcelName VARCHAR(120) NOT NULL,
  dateAndTimeAdded DATETIME NOT NULL,
  senderUsername VARCHAR(25) NOT NULL,
  assignedCourier VARCHAR(25),
  personWhoReceivedParcel VARCHAR(100),
  signature TEXT,
  dateAndTimeReceived DATETIME,
  locationReceived VARCHAR(25),
  parcelStatus VARCHAR(14) DEFAULT 'not-dispatched',
  FOREIGN KEY (senderUsername) REFERENCES users(userName),
  FOREIGN KEY (assignedCourier) REFERENCES users(userName)
);

INSERT INTO users(userName, password, email, userType)
	VALUES('customer1', '$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO', 'customer1@gmail.com', 'user'),
        ('customer2', '$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO', 'customer2@gmail.com', 'user'),
        ('courier1', '$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO', 'courier1@gmail.com', 'courier'),
        ('courier2', '$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO', 'courier2@gmail.com', 'courier');