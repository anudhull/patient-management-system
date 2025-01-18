# Patient Management System

## Overview
This project is a **Patient Management System** for orthodontists that helps in managing patient records, appointments, and consultations efficiently. The system facilitates interactions between patients, doctors, and administrative staff, ensuring secure and organized handling of sensitive medical information.

## Features

- **User Authentication**: JWT-based authentication with role-based access control for three user types:
  - **Patient**: Can view and manage their own records and appointments.
  - **Doctor**: Can manage patient records assigned to them and manage appointments.
  - **Admin**: Has full access to all patient records and appointments.
  
- **Patient Record Management**: Create, read, update, and delete patient records with strict access control.
  
- **Appointment Management**: Allows patients to book appointments, doctors to manage appointments with their assigned patients, and admins to manage all appointments.

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
1. Node.js
2. MongoDB
3. Git

### Clone the Repository
```bash
git clone https://github.com/anudhull/patient-management-system.git
cd patient-management-system
```

### Install Dependencies
```bash
npm install
```

### Start the Server
```bash
npm start
```


