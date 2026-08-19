INSERT INTO DIVISION (division_id, name) VALUES (1, 'Dhaka');
INSERT INTO DISTRICT (district_id, name, division_id) VALUES (1, 'Dhaka', 1);
INSERT INTO UPAZILA (upazila_id, name, district_id) VALUES (1, 'Dhanmondi', 1);

INSERT INTO ADMIN_USER (admin_id, username, password_hash, role)
VALUES (1, 'sysadmin', '$2b$10$hashedpasswordsample', 'SuperAdmin');

INSERT INTO CITIZEN (nid_no, full_name, dob, gender, blood_group, marital_status)
VALUES ('1998269260000001', 'Tasfika Jahan', '1998-05-12', 'Female', 'A+', 'Single');

INSERT INTO ADDRESS (nid_no, type, upazila_id, details)
VALUES ('1998269260000001', 'Present', 1, 'Road 27, Dhanmondi, Dhaka');