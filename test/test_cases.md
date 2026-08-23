# Test Cases — BNIMS (Bangladesh National ID Management System)

This document lists the test cases used to verify the BNIMS backend API and its integration with the frontend. All tests were performed manually against the local development environment (XAMPP MySQL + Node.js/Express backend + static HTML/JS frontend).

**Test Environment:**
- Backend: Node.js + Express, running on `http://localhost:5000`
- Database: MySQL (via XAMPP), database name `bnims_db`
- Frontend: Static HTML/CSS/JS served directly from the file system

---

## 1. Database Connection Tests

| Test ID | Description | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| DB-01 | Backend connects to MySQL on startup | Run `node server.js` | Console shows "Server running on http://localhost:5000" with no connection errors | As expected | Pass |
| DB-02 | Backend handles wrong DB host gracefully | Set `DB_HOST=localhost` (before fix) and query an endpoint | AggregateError due to IPv6/IPv4 mismatch on Windows | Reproduced; fixed by changing to `DB_HOST=127.0.0.1` | Pass (after fix) |

---

## 2. Citizen Module

| Test ID | Description | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| CIT-01 | Retrieve citizen by valid NID | GET `/api/citizens/1998269260000001` | Returns `success: true` with citizen's full details, address, and location hierarchy | Returned correct data including present address, upazila, district, division | Pass |
| CIT-02 | Retrieve citizen by non-existent NID | GET `/api/citizens/0000000000000000` | Returns `success: false`, message "Citizen record not found", HTTP 404 | As expected | Pass |
| CIT-03 | Update citizen's blood group | PUT `/api/citizens/1998269260000001` with new `blood_group` | Returns `success: true`, "Citizen updated successfully"; value reflected on next GET | As expected | Pass |
| CIT-04 | Delete a citizen record | DELETE `/api/citizens/<nid>` | Returns `success: true`, "Citizen deleted successfully"; related ADDRESS/FATHER/MOTHER/SPOUSE rows removed via ON DELETE CASCADE | As expected | Pass |
| CIT-05 | SQL reserved-keyword bug (regression test) | Query citizen with DIVISION join using alias `div` | Query fails: "error in your SQL syntax ... near 'div ON ...'" because `DIV` is a MariaDB reserved operator | Reproduced; fixed by renaming alias to `dv` | Pass (after fix) |

---

## 3. Father / Mother / Spouse Modules

| Test ID | Description | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| FAM-01 | Retrieve father record by citizen NID | GET `/api/fathers/1998269260000001` | Returns `success: true` with father's name | Returned "Abdul Karim" correctly | Pass |
| FAM-02 | Retrieve mother record by citizen NID | GET `/api/mothers/1998269260000001` | Returns `success: true` with mother's name | Returned "Rahima Khatun" correctly | Pass |
| FAM-03 | Retrieve spouse record by citizen NID | GET `/api/spouses/1998269260000001` | Returns `success: true` with spouse's name | Returned "Kamal Hossain" correctly | Pass |
| FAM-04 | Retrieve family record for citizen with no father/mother/spouse on file | GET `/api/fathers/<nid with no father row>` | Returns `success: false`, "Father record not found", HTTP 404 | As expected | Pass |

---

## 4. Authentication Module

| Test ID | Description | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| AUTH-01 | Login with correct credentials | POST `/api/auth/login` with `{ username: "sysadmin", password: "admin123" }` | Returns `success: true`, a signed JWT token, and admin info | As expected; token generated and stored in `localStorage` | Pass |
| AUTH-02 | Login with incorrect password | POST `/api/auth/login` with wrong password | Returns `success: false`, "Invalid username or password", HTTP 401 | As expected | Pass |
| AUTH-03 | Login with non-existent username | POST `/api/auth/login` with unknown username | Returns `success: false`, "Invalid username or password", HTTP 401 | As expected | Pass |
| AUTH-04 | Password stored as bcrypt hash, not plaintext | Inspect `ADMIN_USER.password_hash` column | Value is a bcrypt hash (`$2b$10$...`), never the raw password | Confirmed | Pass |

---

## 5. Frontend Integration Tests

| Test ID | Description | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| FE-01 | Search citizen from dashboard | Enter valid NID in dashboard search box, click Search | Citizen table + Family Information table render with live data from backend | As expected | Pass |
| FE-02 | Search citizen with empty input | Click Search with the input box empty | Shows "Please enter an NID number." without calling the API | As expected | Pass |
| FE-03 | Update blood group from dashboard | Click "Update Blood Group", enter a new value | Confirmation alert shown, table refreshes with updated value | As expected | Pass |
| FE-04 | Delete citizen from dashboard | Click "Delete Citizen", confirm the prompt | Confirmation alert shown, result area clears | As expected | Pass |
| FE-05 | Login through login.html | Enter valid `sysadmin` / `admin123`, submit form | "Login Successful!" alert, redirected to `dashboard.html`, token saved in `localStorage` | As expected | Pass |
| FE-06 | Login with invalid credentials | Enter wrong username/password, submit form | Alert shows the backend's error message; no redirect | As expected | Pass |
| FE-07 | Backend offline scenario | Stop the backend server, then search from dashboard | Shows "Could not connect to server. Is the backend running?" instead of crashing | As expected | Pass |

---

## Summary

| Category | Total Cases | Passed | Failed |
|---|---|---|---|
| Database Connection | 2 | 2 | 0 |
| Citizen Module | 5 | 5 | 0 |
| Father/Mother/Spouse Modules | 4 | 4 | 0 |
| Authentication | 4 | 4 | 0 |
| Frontend Integration | 7 | 7 | 0 |
| **Total** | **22** | **22** | **0** |

All tests passed after the two bugs identified during testing (IPv6/IPv4 host resolution, and the `DIV` reserved-keyword alias collision) were fixed. See `testing_report.md` for a narrative summary of the testing process and issues found.