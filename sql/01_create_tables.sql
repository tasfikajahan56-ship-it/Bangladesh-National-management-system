CREATE TABLE DIVISION (
    division_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE DISTRICT (
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    division_id INT NOT NULL,
    FOREIGN KEY (division_id) REFERENCES DIVISION(division_id)
);

CREATE TABLE UPAZILA (
    upazila_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    district_id INT NOT NULL,
    FOREIGN KEY (district_id) REFERENCES DISTRICT(district_id)
);

CREATE TABLE CITIZEN (
    nid_no VARCHAR(17) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group VARCHAR(5),
    marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed')
);

CREATE TABLE ADDRESS (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    type ENUM('Present', 'Permanent') NOT NULL,
    upazila_id INT NOT NULL,
    details TEXT NOT NULL,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE,
    FOREIGN KEY (upazila_id) REFERENCES UPAZILA(upazila_id)
);

CREATE TABLE ADMIN_USER (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin'
);

CREATE TABLE VERIFICATION_LOG (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    action VARCHAR(100) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    admin_id INT NOT NULL,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no),
    FOREIGN KEY (admin_id) REFERENCES ADMIN_USER(admin_id)
);
