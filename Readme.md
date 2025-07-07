# LingoBuddy

A language learning web application built with the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS ).

## Team Details 

| Team Number | Members | Project Number | Project Name | Col5 | Member Role | Member Name | Registration Number | VIT Email | Personal Email | Phone Number |
|---|---|---|---|---|---|---|---|---|---|---|
| 3 | 4 | P03 | Language Learning App | M1 | M1 | Dhairya Gothi | 23BCE10225 | dhairya.23bce10225@vitbhopal.ac.in | dhairyag31@gmail.com | 9424065768 |
| | | | | | M2 | Rishita Mehta | 23BCE10235 | rishita.23bce10235@vitbhopal.ac.in | rishitamehta298@gmail.com | 8854940711 |
| | | | | | M3 | Riddhi Mhadgut | 23BCE10110 | riddhi.23bce10110@vitbhopal.ac.in | riddhimhadgut17@gmail.com | 9109356746 |
| | | | | | M4 | Mradul Pratap Singh Parihar | 23BSA10178 | mradul.23bsa10178@vitbhopal.ac.in | officialcoding1@gmail.com | 7747067385 |

## Project Structure

```
root/
  backend/    # All backend code (APIs, database)
  frontend/   # All frontend code (React app)
```

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/dhairyagothi/lingobuddy.git
cd lingobuddy
```

#### 2. Install dependencies for backend and frontend

```bash
cd backend
npm install

cd ../frontend
npm install
```

#### 3. Set up environment variables

- Copy `.env.example` to `.env` in the `backend/` directory and update values as needed.

#### 4. Run the backend server

```bash
cd backend
npm start
```

#### 5. Run the frontend React app

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:5000` (by default).

## Features

- User registration and authentication
- Lesson creation, editing, and viewing
- Interactive quizzes
- Progress tracking dashboard
- Responsive design

## Folder Structure

### `/backend/`
- `controllers/`: Handles request logic
- `models/`: Mongoose models
- `routes/`: API endpoints
- `middleware/`: Authentication, validation, etc.
- `utils/`: Helper functions
- `app.js`: Main Express server file

### `/frontend/`
- `components/`: Reusable React components
- `pages/`: Top-level pages (Home, Login, Dashboard)
- `services/`: API calls to backend
- `styles/`: CSS/SCSS files
- `App.js`, `index.js`: Entry points

## License

This project is licensed under the MIT License.
