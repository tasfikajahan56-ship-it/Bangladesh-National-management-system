# Testing Report — BNIMS (Bangladesh National ID Management System)

## 1. Purpose

This report summarizes the manual testing carried out on the BNIMS backend API, database layer, and frontend integration. Testing was performed incrementally as each module (Citizen, Father, Mother, Spouse, Authentication) was built, rather than all at once at the end — each feature was verified working before moving to the next.

## 2. Testing Approach

Testing was **manual and functional**, focused on verifying that:
1. Each API endpoint returns the correct response for valid input.
2. Each API endpoint fails gracefully (with a clear error message) for invalid or missing input.
3. The frontend correctly displays data returned by the backend.
4. The system behaves safely when the backend is unreachable.

Tools used:
- **phpMyAdmin** — to set up test data and verify database state directly
- **Browser address bar** — for GET requests
- **Browser DevTools Console (`fetch`)** — for POST/PUT/DELETE requests during backend-only testing
- **The actual frontend UI** (`dashboard.html`, `login.html`) — for full end-to-end testing

## 3. Issues Found and Resolved During Testing

### Issue 1: Database connection failure (AggregateError)
**When found:** First attempt to query `/api/citizens/:nid_no` after connecting the backend to MySQL.
**Cause:** On Windows, `DB_HOST=localhost` was resolving to the IPv6 address (`::1`), while XAMPP's MySQL was only listening on the IPv4 address (`127.0.0.1`), causing the connection to fail.
**Fix:** Changed `DB_HOST` in `.env` from `localhost` to `127.0.0.1`.
**Verification:** Re-ran the same query; it returned data successfully after the fix.

### Issue 2: SQL syntax error from reserved keyword
**When found:** After fixing Issue 1, the same query returned an SQL syntax error near `div ON d.division_id = div.division_id`.
**Cause:** The query used `div` as a table alias for the `DIVISION` table. `DIV` is a reserved arithmetic operator in MySQL/MariaDB (integer division, e.g. `10 DIV 3`), so the database parser could not interpret it as an alias.
**Fix:** Renamed the alias from `div` to `dv` throughout `citizen.model.js`.
**Verification:** Re-ran the query; it returned the citizen record with joined address, upazila, district, and division data successfully.

### Issue 3: Stale server process serving old routes
**When found:** After adding the Spouse module (model, controller, routes) and restarting the server, `GET /api/spouses/:nid_no` still returned "Cannot GET" as if the route didn't exist.
**Cause:** An old `node server.js` process from before the Spouse routes were added was still running in a separate terminal tab and holding port 5000, so requests were being served by the outdated code.
**Fix:** Closed all terminal tabs and started a single fresh `node server.js` process.
**Verification:** The Spouse endpoint then responded correctly.

## 4. Test Coverage Summary

Testing covered:
- Database connectivity and configuration
- All CRUD operations on the Citizen table
- Read operations on Father, Mother, and Spouse tables
- Authentication (valid login, invalid password, invalid username, password hashing)
- Frontend-to-backend integration for search, update, delete, and login
- Error handling when the backend is offline

A full breakdown of individual test cases, steps, and results is provided in `test_cases.md`.

## 5. Conclusion

All 22 documented test cases passed after the three issues above were identified and resolved. The system correctly connects to the database, performs CRUD operations across all implemented modules, authenticates admin users securely using bcrypt-hashed passwords and JWT tokens, and the frontend reflects live data from the backend rather than hardcoded placeholder values.

**Known limitations at time of this report:**
- The `authMiddleware` currently injects a default admin identity rather than strictly validating the JWT token on every protected route — full JWT verification middleware is a planned improvement.
- Create (POST) operations for Father, Mother, and Spouse have been implemented but not yet exercised through the frontend UI, only tested directly against the API.