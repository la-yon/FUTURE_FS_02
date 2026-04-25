# Mini CRM - Client Lead Management System

A simple full-stack mini CRM app built with:

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT-based admin login

## Project Structure

```
backend/
  server.js
  models/Lead.js
  routes/leadRoutes.js
  controllers/leadController.js
  middleware/auth.js
  .env.example
  package.json

frontend/
  public/index.html
  src/
    components/
    pages/
    App.js
    api.js
    index.js
    styles.css
  package.json
```

## 1) MongoDB Setup

Make sure MongoDB is running locally (or use MongoDB Atlas URI).

In `backend`, create a `.env` file by copying `.env.example`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=supersecretkey
ADMIN_EMAIL=admin@crm.com
ADMIN_PASSWORD=admin123
```

## 2) Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## 3) Run the App

Open two terminals.

### Terminal 1 (Backend)

```bash
cd backend
npm start
```

or for auto-reload:

```bash
npm run dev
```

### Terminal 2 (Frontend)

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## Default Login

- Email: `admin@crm.com`
- Password: `admin123`

## API Endpoints

- `POST /api/auth/login` -> admin login and JWT token
- `GET /api/leads` -> get all leads (protected)
- `POST /api/leads` -> create lead (protected)
- `PUT /api/leads/:id` -> update lead/status (protected)
- `DELETE /api/leads/:id` -> delete lead (protected)
- `POST /api/leads/:id/notes` -> add note to lead (protected)

## Features Included

- Admin login with JWT
- Lead CRUD (create, read, update, delete)
- Status update via dropdown
- Add and view multiple notes per lead
- Search by name/email/source
- Filter by status
- Success/error feedback messages
- Responsive clean UI with simple CSS
