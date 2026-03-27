# Student Management App

A simple CRUD application to manage student data. Built with Node.js, Express, and a frontend using HTML, CSS, and JavaScript. The project demonstrates proper separation of concerns with routes, controllers, and services, and includes CORS handling for frontend-backend communication.

---

## Features

- List all students
- Fetch student data via REST API
- Fully modular backend:
  - Routes define endpoints
  - Controllers handle requests and responses
  - Services contain business logic and data access
- Frontend fetches data and displays student cards
- CORS enabled for cross-origin requests
- JSON-based data storage (students.json)

---

## Folder Structure
    project/
    ├── index.js # Entry point: sets up server & middleware
    ├── package.json
    ├── students.json # Student data
    ├── routes/
    │ └── students.js # API route definitions
    ├── controllers/
    │ └── studentsController.js # Request handling
    └── services/
    └── studentsService.js # Business logic / data access
    ├── frontend/
    ├── index.html
    ├── script.js
    └── style.css

---

## Getting Started

### Prerequisites

- Node.js (v14+)  
- npm (Node Package Manager)  

---

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd project
```

Install dependencies:
```
npm install
```
Start the server:
```
npm start
```
Server runs on: http://localhost:3000

Frontend

Open frontend/index.html in a browser. The frontend fetches student data from:

    http://localhost:3000/students

Make sure the backend server is running before opening the frontend.

API Endpoints
| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /students     | Get all students           |
| GET    | /students/:id | Get a single student by ID |
| POST   | /students     | Create a new student       |
| PUT    | /students/:id | Update a student by ID     |
| DELETE | /students/:id | Delete a student by ID     |


Example JSON Response
```JSON
[
  {
    "name": "Alice Smith",
    "major": "Computer Science",
    "email": "alice@example.com",
    "gpa": 3.9
  },
  {
    "name": "Bob Jones",
    "major": "Computer Science",
    "email": "bob@example.com",
    "gpa": 3.7
  }
]
```

### Notes
CORS is enabled using the cors package, allowing the frontend to fetch data from a different origin.
Backend follows MVC-style separation: Routes → Controllers → Services.
Frontend dynamically renders student cards with initials, name, major, email, and GPA.


### Troubleshooting
ERR_CONNECTION_REFUSED: Ensure the backend is running on http://localhost:3000
.
Cannot read properties of undefined: Check that the frontend is fetching /students and that the server returns an array.
CORS errors: Confirm that app.use(cors()) is present in index.js.
