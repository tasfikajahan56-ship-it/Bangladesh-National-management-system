# 🇧🇩 Bangladesh National ID Management System (BNIMS)

> **DBMS Course Project** — A fully normalized relational database system for managing Bangladesh National ID records.

![Project](https://img.shields.io/badge/Project-DBMS%20Course-006A4E?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Progress-C8102E?style=for-the-badge)
![Duration](https://img.shields.io/badge/Duration-11%20Weeks-006A4E?style=for-the-badge)
![GitHub](https://img.shields.io/badge/Version%20Control-GitHub-181717?style=for-the-badge&logo=github)

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [System Modules](#-system-modules)
- [Repository Structure](#-repository-structure)
- [11-Week Roadmap](#-11-week-roadmap)
- [Database Design](#-database-design)
- [Normalization](#-normalization)
- [Tools & Technologies](#-tools--technologies)
- [Weekly GitHub Push Log](#-weekly-github-push-log)
- [Team](#-team)

---

## 📖 Project Overview

The **Bangladesh National ID Management System (BNIMS)** is a database-driven application designed to manage citizen identity records for Bangladesh. The system aims to solve the problem of fragmented, inconsistent NID data by providing:

- A centralized, normalized relational database (up to 3NF)
- Full CRUD operations with referential integrity
- NID verification and audit trail functionality
- Administrative access control
- A user-friendly UI prototype

**Course:** Database Management Systems (DBMS)  
**Project Duration:** 11 Weeks  
**Version Control:** Weekly incremental GitHub pushes

---

## 🧩 System Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Citizen Information Module** | NID Number, Full Name, Date of Birth, Gender, Blood Group, Marital Status |
| 2 | **Address Management Module** | Present Address, Permanent Address, Division, District, Upazila |
| 3 | **Family Information Module** | Father Info, Mother Info, Spouse Info |
| 4 | **Verification Module** | NID Verification queries, Information Update History |
| 5 | **Administrative Module** | User Login, Data Management, Report Generation |

---

## 📁 Repository Structure

```
BNIMS/
│
├── README.md                        ← Project overview (this file)
│
├── docs/                            ← All documentation
│   ├── proposal.md                  ← Week 1: Project proposal
│   ├── literature_review.md         ← Week 2: Literature review
│   ├── SRS.md                       ← Week 3: Software Requirement Specification
│   ├── final_documentation.md       ← Week 10: Final documentation
│   └── final_report.pdf             ← Week 11: Final report (PDF)
│
├── design/                          ← Database design artifacts
│   ├── ER_diagram.png               ← Week 4: Entity-Relationship Diagram
│   ├── data_dictionary.md           ← Week 4: Data dictionary
│   └── schema.md                    ← Week 5: Relational schema + normalization
│
├── sql/                             ← All SQL scripts
│   ├── create_tables.sql            ← Week 6: DDL — table creation
│   ├── constraints.sql              ← Week 6: PK, FK, constraints
│   ├── insert_data.sql              ← Week 7: Sample data insertion
│   └── queries.sql                  ← Week 7: CRUD + complex queries
│
├── ui/                              ← User Interface
│   └── wireframes/                  ← Week 8: Wireframes & prototype screens
│
├── tests/                           ← Testing
│   ├── test_cases.md                ← Week 9: Test cases
│   └── testing_report.md            ← Week 9: Testing report
│
└── presentation/                    ← Final presentation
    └── BNIMS_slides.pdf             ← Week 11: Presentation slides
```

---

## 📅 11-Week Roadmap

| Week | Activities | Deliverables | GitHub Push |
|------|-----------|--------------|-------------|
| **1** | Project Topic Selection, Problem Identification, Requirement Gathering | Project Proposal, Problem Statement, Objectives | `docs/proposal.md` |
| **2** | Literature Review and Existing System Analysis | Literature Review Report, Comparative Analysis | `docs/literature_review.md` |
| **3** | Requirement Analysis (Functional & Non-Functional) | Software Requirement Specification (SRS) Draft | `docs/SRS.md` |
| **4** | Database Design (ER Diagram, Entities, Relationships) | ER Diagram, Data Dictionary | `design/ER_diagram.png`, `design/data_dictionary.md` |
| **5** | Relational Schema, Normalization (1NF → 3NF) | Database Schema Documentation | `design/schema.md` |
| **6** | SQL Table Creation, PK & FK Implementation | Database Structure, SQL Scripts | `sql/create_tables.sql`, `sql/constraints.sql` |
| **7** | Data Insertion, Query Development, CRUD Operations | SQL Queries, Sample Dataset | `sql/insert_data.sql`, `sql/queries.sql` |
| **8** | UI Design and Prototype Development | Wireframes / Prototype Screens | `ui/wireframes/` |
| **9** | System Integration and Testing | Test Cases, Testing Report | `tests/test_cases.md`, `tests/testing_report.md` |
| **10** | Performance Evaluation, Error Fixing, Documentation | Final System Documentation | `docs/final_documentation.md` |
| **11** | Presentation Preparation and Final Submission | Presentation Slides, Final Report | `presentation/BNIMS_slides.pdf`, `docs/final_report.pdf` |

---

## 🗃️ Database Design

### Key Entities

```
CITIZEN (nid_no PK, full_name, dob, gender, blood_group, marital_status)
ADDRESS (address_id PK, nid_no FK, type, upazila_id FK, details)
UPAZILA (upazila_id PK, name, district_id FK)
DISTRICT (district_id PK, name, division_id FK)
DIVISION (division_id PK, name)
FATHER (father_id PK, nid_no FK, name, nid_ref)
MOTHER (mother_id PK, nid_no FK, name, nid_ref)
SPOUSE (spouse_id PK, nid_no FK, name, nid_ref)
VERIFICATION_LOG (log_id PK, nid_no FK, action, timestamp, admin_id FK)
ADMIN_USER (admin_id PK, username, password_hash, role)
```

### Relationships

- One CITIZEN → Many ADDRESS records (present + permanent)
- One CITIZEN → One FATHER, One MOTHER, One SPOUSE
- ADDRESS → UPAZILA → DISTRICT → DIVISION (hierarchical)
- CITIZEN → VERIFICATION_LOG (audit trail)

---

## 📐 Normalization

| Normal Form | Rule | BNIMS Action Taken |
|-------------|------|--------------------|
| **1NF** | Atomic values, no repeating groups | Separated multi-valued address and family fields into individual tables |
| **2NF** | No partial dependency on composite key | All non-key attributes depend on the full primary key |
| **3NF** | No transitive dependencies | Extracted Division, District, Upazila into separate lookup tables |

---

## 🛠️ Tools & Technologies

| Category | Tool |
|----------|------|
| **Database** | MySQL / PostgreSQL |
| **ER Diagram** | draw.io / dbdiagram.io |
| **UI Prototype** | Figma / Balsamiq |
| **Documentation** | Markdown, LaTeX |
| **Version Control** | Git & GitHub |
| **SQL Client** | MySQL Workbench / DBeaver |
| **IDE** | VS Code |

---

## 📋 Weekly GitHub Push Log

| Week | Push Date | Files Pushed | Status |
|------|-----------|--------------|--------|
| Week 1 | — | `docs/proposal.md` | ⬜ Pending |
| Week 2 | — | `docs/literature_review.md` | ⬜ Pending |
| Week 3 | — | `docs/SRS.md` | ⬜ Pending |
| Week 4 | — | `design/ER_diagram.png`, `design/data_dictionary.md` | ⬜ Pending |
| Week 5 | — | `design/schema.md` | ⬜ Pending |
| Week 6 | — | `sql/create_tables.sql`, `sql/constraints.sql` | ⬜ Pending |
| Week 7 | — | `sql/insert_data.sql`, `sql/queries.sql` | ⬜ Pending |
| Week 8 | — | `ui/wireframes/` | ⬜ Pending |
| Week 9 | — | `tests/test_cases.md`, `tests/testing_report.md` | ⬜ Pending |
| Week 10 | — | `docs/final_documentation.md` | ⬜ Pending |
| Week 11 | — | `presentation/BNIMS_slides.pdf`, `docs/final_report.pdf` | ⬜ Pending |

> ✅ Completed &nbsp; 🔄 In Progress &nbsp; ⬜ Pending

---


Name : Tasfika Jahan |
id : 251035016

---

## 📄 License

This project is created for academic purposes as part of a DBMS course.  
© 2025 BNIMS Project Team — All rights reserved.

---

<div align="center">
  <strong>🇧🇩 Bangladesh National ID Management System (BNIMS)</strong><br>
  DBMS Course Project — 11-Week Incremental GitHub Delivery
</div>
