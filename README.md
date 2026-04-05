# 🎓 AI Mentor

**AI Mentor** is a full-stack web application that helps students prepare for competitive entrance exams (JEE / NEET) through AI-powered adaptive quizzes, personalized study plans, and visual progress tracking.

---

## ✨ Features

- **User Authentication** — Secure sign-up and sign-in backed by JWT tokens and bcrypt password hashing.
- **Profile Setup** — Students choose their exam (JEE / NEET), target subjects, and goal year.
- **Personalized Dashboard** — Displays a study plan, weak-topic highlights, and progress summaries.
- **Interactive Quizzes** — Multiple-choice questions with instant feedback and score tracking.
- **Results & Analytics** — Per-session score, accuracy percentage, and question-level review.
- **Progress Visualization** — Segmented progress circles and performance graphs per subject.
- **Responsive Design** — Mobile-first UI built with Tailwind CSS and Material-UI.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router DOM |
| UI | Tailwind CSS 4, Material-UI (MUI) 7, Emotion |
| Backend | Node.js, Express 5 |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |
| Quiz Data | MockAPI (REST) |
| Linting | ESLint 9 |

---

## 📋 Requirements

- **Node.js** v18 or higher
- **npm** v9 or higher
- Git

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/prat-glitch/AI_MENTOR.git
cd AI_MENTOR
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd auth-backend
npm install
cd ..
```

### 4. Configure environment variables

Create a `.env` file in the **repository root** (next to `package.json`):

```env
# Secret key used to sign JWT tokens — replace with a strong random string
JWT_SECRET=your_jwt_secret_here
```

> The backend defaults to `"mysecretkey"` if `JWT_SECRET` is not set, but it is strongly recommended to provide your own value.

---

## ▶️ Running the Application

### Start the backend (auth server — port 5000)

```bash
cd auth-backend
npm start
```

### Start the frontend dev server (port 5173)

In a separate terminal from the repository root:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other frontend commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## ⚙️ Configuration

| Variable | Location | Description |
|----------|----------|-------------|
| `JWT_SECRET` | `.env` (root) | Secret used to sign and verify JWT tokens |
| Backend API URL | `src/services/auth.js` | Points to `https://ai-mentor-b7hg.onrender.com` by default |
| Quiz API URL | `src/services/quizservice.js` | MockAPI endpoint for quiz questions |

---

## 📂 Project Structure

```
AI_MENTOR/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite build configuration
├── eslint.config.js            # ESLint rules
├── .env                        # Environment variables (not committed)
│
├── src/                        # Frontend source
│   ├── main.jsx                # React DOM entry point
│   ├── App.jsx                 # Root component
│   ├── router.jsx              # Route definitions
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ProgressCircle.jsx
│   │   ├── ProgressGraph.jsx
│   │   ├── SegmentedProgressCircle.jsx
│   │   ├── PlanCard.jsx
│   │   └── LogoCard.jsx
│   ├── pages/                  # Route-level page components
│   │   ├── Landing.jsx
│   │   ├── Splash.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── ProfileSetup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Quiz.jsx
│   │   └── Result.jsx
│   ├── services/               # API service layer
│   │   ├── auth.js             # Authentication API calls
│   │   └── quizservice.js      # Quiz questions API calls
│   └── theme/
│       └── theme.js            # MUI theme configuration
│
└── auth-backend/               # Express authentication server
    ├── server.js               # API routes (port 5000)
    └── package.json
```

---

## 💡 Usage Examples

### Sign Up and Start a Quiz

1. Open [http://localhost:5173](http://localhost:5173).
2. Click **Get Started** on the landing page.
3. Fill in your email and password on the **Sign Up** page.
4. Complete the **Profile Setup** (exam type, subjects, target year).
5. You are redirected to the **Dashboard** — review your study plan.
6. Click **Start Quiz** to begin a session.
7. Answer the multiple-choice questions and view your **Results** at the end.

### Sign In (returning user)

1. Click **Sign In** in the navbar.
2. Enter your credentials — a JWT token is stored in `localStorage` upon success.
3. You are redirected to the **Dashboard**.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`.

Please ensure your code passes `npm run lint` before submitting.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ to make exam preparation smarter and more personalized.
