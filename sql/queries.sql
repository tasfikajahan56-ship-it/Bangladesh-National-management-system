-- 1. Get all female citizens residing in 'Dhanmondi' Upazila
SELECT C.nid_no, C.full_name, C.blood_group, A.details
FROM CITIZEN C
JOIN ADDRESS A ON C.nid_no = A.nid_no
JOIN UPAZILA U ON A.upazila_id = U.upazila_id
WHERE U.name = 'Dhanmondi' AND C.gender = 'Female';

-- 2. Fetch detailed audit trail of NID verifications performed by Admins
SELECT V.log_id, V.action, V.timestamp, A.username AS admin_name, C.full_name AS citizen_name
FROM VERIFICATION_LOG V
JOIN ADMIN_USER A ON V.admin_id = A.admin_id
JOIN CITIZEN C ON V.nid_no = C.nid_no;

-- 3. Get total pending NID correction/reissue applications
SELECT R.request_id, R.nid_no, C.full_name, R.request_type, R.reason, R.applied_date
FROM REISSUE_REQUEST R
JOIN CITIZEN C ON R.nid_no = C.nid_no
WHERE R.status = 'Pending';

-- 4. Count total citizens grouped by Blood Group
SELECT blood_group, COUNT(*) AS total_citizens
FROM CITIZEN
GROUP BY blood_group;