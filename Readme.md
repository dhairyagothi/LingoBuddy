# LingoBuddy

A language learning web application built with the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS).

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