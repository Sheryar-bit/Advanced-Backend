# ACID Property Experimentation with Node.js and PostgreSQL

This repository contains a hands-on laboratory for exploring and understanding ACID properties (Atomicity, Consistency, Isolation, and Durability) in a relational database using Node.js and the `pg` (node-postgres) driver.

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm or yarn

## Setup

1. Environment Configuration:
   Create a `.env` file in the root of the `ACID` directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_PORT=5432
   ```

2. Database Initialization:
   Execute the `db/init.sql` script in your PostgreSQL database to create the `accounts` table and populate it with initial test data.

## Folder Structure

- `config/`: Database connection configuration and environment variable loading.
- `db/`: Core database logic, including the connection pool, transaction wrapper, and initialization SQL.
- `services/`: Business logic for account operations (e.g., fund transfers).
- `tests/`: Specialized scripts to demonstrate and verify each ACID property.
- `utils/`: Common utility functions like delays.

## Core Components

### Transaction Wrapper (db/transaction.js)
The `withTransaction` function manages the lifecycle of a database transaction. It handles the `BEGIN`, `COMMIT`, and `ROLLBACK` commands automatically, ensuring that operations are grouped together correctly.

### Account Service (services/account.service.js)
The `transferFunds` function implements the core logic for moving balance between accounts. It uses row-level locking (`FOR UPDATE`) to ensure isolation and includes an artificial delay for easier testing of concurrent access.

## Running the ACID Tests

Each test in the `tests/` directory is designed to prove a specific property.

### 1. Atomicity
File: `tests/atomicity.js`
Demonstrates that a transaction is all-or-nothing. The script simulates a failure after the first stage of a transfer. Verification consists of checking that neither the sender nor the receiver's balance was modified.

### 2. Consistency
File: `tests/consistency.js`
Demonstrates that database constraints (like `CHECK (balance >= 0)`) prevent the database from entering an invalid state. The script attempts to set a negative balance, which causes a constraint violation and triggers a rollback.

### 3. Isolation
File: `tests/isolation.js`
Demonstrates row-level locking and concurrent transaction management. By running this script in one terminal to lock a row and then attempting another operation in a separate terminal, you can observe the blocking behavior that maintains data integrity.

### 4. Durability
File: `tests/durability.js`
Demonstrates that committed data is permanent. After a successful transfer, you are prompted to restart your PostgreSQL service. After the restart, the changes remain visible, proving they were safely written to non-volatile storage.

## Utility Commands

### View Accounts
To view the current state of all accounts in a table format:
```bash
node db/check-accounts.js
```

### Reset Data
To restore the accounts to their initial state, re-run the `db/init.sql` script using your database management tool.
