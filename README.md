# LeadFlow AI

An AI-powered business assistant that captures leads, classifies them automatically, and sends confirmation emails — all without manual effort.

---

## What It Does

- **AI Chatbot** — Answers customer questions in real time using DeepSeek via OpenRouter.
- **Lead Capture** — Collects customer info through a clean contact form.
- **Auto Classification** — Uses AI to classify each lead as Hot, Warm, or Cold.
- **Email Automation** — Sends a confirmation email to the customer automatically via Brevo.
- **Admin Dashboard** — View all leads, chat history, and stats. Protected by login.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios, Vanilla CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | Passport.js (Local Strategy) + express-session |
| AI | DeepSeek R1 via OpenRouter API |
| Email | Brevo Transactional Email API |

---

## Getting Started

### 1. Clone and install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Set up environment variables

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
BREVO_API_KEY=your_brevo_api_key
SESSION_SECRET=any_random_secret_string
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the admin account

```bash
cd server
node scripts/seedAdmin.js
```

Default credentials:
- **Username:** `admin`
- **Password:** `admin123`

### 4. Run the app

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API Routes

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/leads` | Public | Submit a new lead |
| GET | `/api/leads` | Admin only | Get all leads |
| POST | `/api/chat` | Public | Chat with the AI assistant |
| GET | `/api/chats` | Admin only | View chat history |
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/logout` | Admin only | Admin logout |
| GET | `/api/auth/status` | Public | Check session status |

---

## Deployment

Deploy  to Render . Add all `.env` variables in the platform dashboard.



---

*Built with the MERN Stack + AI.*
