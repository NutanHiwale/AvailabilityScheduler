# Availability Scheduler

## Overview

The Availability Scheduler is a system for managing user availability and scheduling events. It allows users to register, login, mangae thier availability and schedule sessions. Administrators have additional capabilities for managing users and sessions.

## Table of Contents

- [Setup and Run Instructions](#setup-and-run-instructions)
- [System Architecture](#system-architecture)
- [Design Choices](#design-choices)
- [Considerations](#considerations)

## Setup and Run Instructions

## Installation 
- **nvm (Node Version Manager)**

    To install `nvm`, follow these instructions:

   - **Installation:**
     ```sh
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
     ```

   - **Reload your shell configuration:**
     ```sh
     source ~/.bashrc  # For Bash users
     source ~/.zshrc   # For Zsh users
     ```

- **Node.js (version 14.x or later)**
 You need to install Node.js to run this project.
```bash
    nvm install 16
    nvm use 16
```
- **MongoDB (version 4.x or later)**
Install MongoDB compass to store data.

1. Download MongoDB Compass

```sh
wget https://downloads.mongodb.com/compass/mongodb-compass_1.43.5_amd64.deb
```
2. Install MongoDB Compass.

```sh
sudo apt install ./mongodb-compass_1.43.5_amd64.deb
```
3. Start MongoDB Compass.
```sh
mongodb-compass
```

## Initializing repositiory

1. **Clone the repository:**

   ```bash
   git init
   git clone https://github.com/NutanHiwale/availability-scheduler.git
   cd availability-scheduler
   ```

2. Install the dependencies:
    ```bash
    npm install
    ```  
2. **Configure environment variables:**
    Create a .env file in the root directory and add the following environment variables:
    ```sh
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
3. **Run the application:**
    Start the backend server: 
    ```bash
    npx nodemon server.js
    ```
## System Architecture

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **File Structure**:
  - `config/`: Contains configuration files.
  - `controllers/`: Contains controller files for handling CRUD operations.
  - `middleware/`: Contains middleware functions.
  - `models/`: Contains Mongoose models for MongoDB collections.
  - `routes/`: Contains route definitions.
  - `server.js`: The main entry point for the application.

## Design Choices

- **Role-Based Access Control**: Implemented to differentiate between admin and user roles.
- **JWT Authentication**: Used for secure authentication and authorization.
- **Separation of Concerns**: Controllers, middleware, and routes are organized to separate business logic from request handling.

## Considerations

- **Error Handling**: Implemented basic error handling in controllers and middleware.
- **Security**: JWT tokens are used to ensure secure access to routes.
- **Scalability**: The system is designed to handle multiple users and sessions efficiently.

- **Testing**: Use Postman or similar tools to test the API endpoints.
