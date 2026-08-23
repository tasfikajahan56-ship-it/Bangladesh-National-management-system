# Final Documentation — BNIMS (Bangladesh National ID Management System)

## 1. Project Overview

BNIMS (Bangladesh National ID Management System) is a full-stack web application for managing citizen identity records, built as an 11-week academic project. It allows an administrator to search, register, update, and delete citizen records along with their family information (father, mother, spouse) and address details, organized by Bangladesh's real administrative hierarchy (Division → District → Upazila).

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (vanilla, no framework) |
| Backend | Node.js, Express.js |
| Database | MySQL (via XAMPP) |
| Authentication | bcrypt (password hashing) + JWT (session tokens) |
| Version Control | Git & GitHub |

## 3. System Architecture


The backend follows an **MVC-style layered architecture**: routes map URLs to controller functions, controllers contain business logic and call model functions, and models are the only layer that talks directly to the database. This separation makes each module (Citizen, Father, Mother, Spouse, Auth) independent and easy to extend.

## 4. Database Design

The database is normalized to **Third Normal Form (3NF)**. See `design/data_dictionary.md` for the full column-level description of every table, and `design/schema.md` for the relational schema and normalization justification. Bangladesh's administrative hierarchy (Division → District → Upazila) is modeled as three separate tables rather than repeating location names on every citizen record, which removes transitive dependencies and redundancy.

## 5. Implemented Features

### 5.1 Citizen Module
- Search a citizen by NID number, returning their full profile joined with their present address, upazila, district, and division
- Register a new citizen
- Update citizen details (e.g., blood group)
- Delete a citizen record (cascades to remove their address and family records)

### 5.2 Family Modules (Father / Mother / Spouse)
- Each has its own model, controller, and route file following the same CRUD pattern as the Citizen module
- Linked to a citizen via NID number
- Displayed together with the citizen's core record on the dashboard under "Family Information"

### 5.3 Authentication
- Admin accounts are stored in the `ADMIN_USER` table with a bcrypt-hashed password — passwords are never stored or transmitted in plain text
- On login, the backend verifies the password against the stored hash and issues a signed JWT token valid for 8 hours
- The frontend stores this token in `localStorage` after a successful login and redirects to the dashboard

### 5.4 Audit Logging
- The `VERIFICATION_LOG` table records every citizen lookup and modification action, along with which admin performed it and when — supporting accountability for a government-style records system

### 5.5 Frontend Dashboard
- A live search box calls the backend API and renders the citizen's details, address hierarchy, and family information in real time
- "Update Blood Group" and "Delete Citizen" buttons call the backend's PUT/DELETE endpoints directly from the browser
- Graceful error handling: if the backend is offline, the UI shows a clear message instead of failing silently

## 6. API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate an admin and issue a JWT token |
| GET | `/api/citizens/:nid_no` | Retrieve a citizen's full record |
| POST | `/api/citizens` | Register a new citizen |
| PUT | `/api/citizens/:nid_no` | Update a citizen's record |
| DELETE | `/api/citizens/:nid_no` | Delete a citizen's record |
| GET / POST / PUT / DELETE | `/api/fathers/:nid_no` | Same CRUD pattern for father records |
| GET / POST / PUT / DELETE | `/api/mothers/:nid_no` | Same CRUD pattern for mother records |
| GET / POST / PUT / DELETE | `/api/spouses/:nid_no` | Same CRUD pattern for spouse records |

## 7. Key Technical Challenges and How They Were Solved

A full narrative is in `tests/testing_report.md`; summarized here:

1. **IPv6/IPv4 host mismatch** — `DB_HOST=localhost` failed to connect to MySQL on Windows because it resolved to IPv6 while MySQL listened on IPv4 only. Solved by using `DB_HOST=127.0.0.1`.
2. **MySQL reserved keyword collision** — using `div` as a table alias for `DIVISION` conflicted with MariaDB's `DIV` arithmetic operator, causing a SQL syntax error. Solved by renaming the alias to `dv`.
3. **Stale server process** — after adding new routes, an old `node server.js` process still running in another terminal continued serving outdated code on the same port. Solved by ensuring only one server process runs at a time.

## 8. Security Measures

- Passwords are hashed with bcrypt (10 salt rounds) before storage — plaintext passwords are never persisted
- JWT tokens are used for session authentication instead of storing credentials client-side
- `.env` file (containing database credentials) is excluded from version control via `.gitignore`
- Foreign key constraints with `ON DELETE CASCADE` maintain referential integrity when a citizen record is removed

## 9. Known Limitations / Future Work

- The authentication middleware currently defaults to an admin identity rather than strictly rejecting requests without a valid JWT on every route — full token verification middleware is a planned improvement
- Create (POST) forms for Father/Mother/Spouse exist at the API level but are not yet exposed through dedicated frontend forms
- No pagination yet on citizen listings — acceptable at current data volume but would need addressing for a production-scale dataset
- Role-based access control (Admin vs Officer) is present as a UI option in `login.html` but not yet enforced on the backend

## 10. Repository Structure

Bangladesh-National-management-system-main/
├── backend/ Node.js/Express API
│ ├── config/ DB and environment config
│ └── src/
│ ├── controllers/ Request/response logic per module
│ ├── models/ SQL queries per module
│ ├── routes/ Endpoint definitions per module
│ └── middlewares/ Auth and error handling
├── frontend/ Static HTML/CSS/JS client
├── sql/ Table creation, sample data, constraints, queries
├── design/ Data dictionary and normalized schema
├── tests/ Test cases and testing report
├── docs/ ER diagram and project roadmap
└── README.md

## 11. Conclusion

BNIMS demonstrates a complete, working full-stack system: a normalized relational database, a REST API with proper separation of concerns, secure authentication, and a frontend that reflects live backend data rather than static placeholders. All core CRUD functionality across Citizen, Father, Mother, and Spouse modules has been implemented and manually tested, with results documented in `tests/test_cases.md`.