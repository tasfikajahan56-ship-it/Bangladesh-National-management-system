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


CREATE TABLE REISSUE_REQUEST (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    request_type ENUM('Lost Card', 'Correction') NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    applied_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE
);

CREATE TABLE PAYMENT (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Pending', 'Paid') DEFAULT 'Pending',
    trx_id VARCHAR(50) UNIQUE,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES REISSUE_REQUEST(request_id) ON DELETE CASCADE
);


CREATE TABLE BIOMETRIC_DATA (
    bio_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    fingerprint_verified TINYINT(1) DEFAULT 0,
    face_verified TINYINT(1) DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE
);

CREATE TABLE AUDIT_LOG (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    target_nid VARCHAR(17) NOT NULL,
    action_performed VARCHAR(100) NOT NULL, -- e.g., 'Address Updated', 'Status Changed'
    action_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES ADMIN_USER(admin_id),
    FOREIGN KEY (target_nid) REFERENCES CITIZEN(nid_no)
);



CREATE TABLE SENIOR_CITIZEN_LOG (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    age INT NOT NULL,
    allowance_eligible TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE
);


CREATE TABLE OTP_LOG (
    otp_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE
);


CREATE TABLE NOTIFICATION (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    nid_no VARCHAR(17) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nid_no) REFERENCES CITIZEN(nid_no) ON DELETE CASCADE
);