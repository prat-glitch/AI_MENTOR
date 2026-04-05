# 🗺️ AI Mentor — Visual Workflow

This document describes how the AI Mentor system works using architecture and sequence diagrams.

---

## 1. High-Level Architecture

The application consists of three runtime layers: the React frontend, the Express auth backend, and two external services (MockAPI for quiz data and the browser's `localStorage` for token persistence).

```mermaid
graph TB
    subgraph Browser["🌐 Browser (React + Vite)"]
        UI["Pages & Components"]
        Router["React Router"]
        AuthSvc["auth.js — Auth Service"]
        QuizSvc["quizservice.js — Quiz Service"]
        Store["localStorage\n(JWT token)"]
    end

    subgraph Backend["🖥️ Auth Backend (Express — port 5000)"]
        AuthAPI["/signup  /login  /me"]
        UserMem["In-memory User Store"]
        JWTLib["jsonwebtoken + bcryptjs"]
    end

    subgraph External["☁️ External Services"]
        MockAPI["MockAPI\n(Quiz Questions)"]
        Render["Render\n(hosted backend)"]
    end

    UI --> Router
    Router --> UI
    UI --> AuthSvc
    UI --> QuizSvc
    AuthSvc --> Store
    AuthSvc -->|"HTTP POST /signup, /login\nGET /me"| AuthAPI
    QuizSvc -->|"HTTP GET /questions"| MockAPI
    AuthAPI --> UserMem
    AuthAPI --> JWTLib
    Backend -.->|"Deployed on"| Render
```

**Key points:**
- The frontend and backend are decoupled; the frontend calls the REST API over HTTP.
- The JWT token is stored in `localStorage` and sent as a `Bearer` header on protected requests.
- Quiz questions are sourced directly from MockAPI — no quiz data passes through the auth backend.
- The backend currently uses in-memory storage (resets on restart); a database can be substituted without changing the API contract.

---

## 2. User Registration & Profile Setup Flow

This sequence covers a brand-new user from landing on the app to reaching their dashboard for the first time.

```mermaid
sequenceDiagram
    actor User
    participant Landing as Landing Page
    participant SignUp as Sign Up Page
    participant Backend as Auth Backend (Express)
    participant Profile as Profile Setup Page
    participant Dashboard as Dashboard

    User->>Landing: Opens app (/)
    Landing->>User: Displays marketing / CTA
    User->>SignUp: Clicks "Get Started" → /signup
    User->>SignUp: Submits email + password
    SignUp->>Backend: POST /signup {email, password}
    Backend->>Backend: Hash password (bcryptjs)
    Backend->>Backend: Store user in memory
    Backend-->>SignUp: 201 { token, user }
    SignUp->>SignUp: Save token to localStorage
    SignUp->>Profile: Redirect → /profile-setup
    User->>Profile: Selects exam (JEE/NEET), subjects, target year
    Profile->>Profile: Store preferences in localStorage / state
    Profile->>Dashboard: Redirect → /dashboard
    Dashboard->>Backend: GET /me (Bearer token)
    Backend->>Backend: Verify JWT
    Backend-->>Dashboard: 200 { user }
    Dashboard->>User: Render personalised study plan & progress
```

---

## 3. Returning User Sign-In Flow

```mermaid
sequenceDiagram
    actor User
    participant SignIn as Sign In Page
    participant Backend as Auth Backend (Express)
    participant Dashboard as Dashboard

    User->>SignIn: Navigates to /signin
    User->>SignIn: Submits email + password
    SignIn->>Backend: POST /login {email, password}
    Backend->>Backend: Lookup user, compare hash (bcryptjs)
    Backend-->>SignIn: 200 { token } or 401 Unauthorized
    alt Success
        SignIn->>SignIn: Save token to localStorage
        SignIn->>Dashboard: Redirect → /dashboard
        Dashboard->>Backend: GET /me (Bearer token)
        Backend-->>Dashboard: 200 { user }
        Dashboard->>User: Render dashboard
    else Failure
        SignIn->>User: Show error message
    end
```

---

## 4. Quiz Session Flow

This sequence describes a complete quiz session from dashboard to results.

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Dashboard
    participant Quiz as Quiz Page
    participant MockAPI as MockAPI (Questions)
    participant Result as Result Page

    User->>Dashboard: Clicks "Start Quiz"
    Dashboard->>Quiz: Navigate → /quiz
    Quiz->>MockAPI: GET /mentor/api/questions
    MockAPI-->>Quiz: 200 [ { question, options, answer, ... } ]
    Quiz->>User: Display first question (MCQ)

    loop For each question
        User->>Quiz: Selects an answer option
        Quiz->>Quiz: Record answer, highlight correct/incorrect
        User->>Quiz: Clicks "Next"
    end

    Quiz->>Result: Navigate → /result (with score state)
    Result->>User: Display score, accuracy %, question review
    User->>Dashboard: Clicks "Back to Dashboard"
    Dashboard->>Dashboard: Update progress visualisations
```

---

## 5. Component & Page Routing Map

```mermaid
graph LR
    A["/  Landing"] -->|"Sign Up"| B["/signup  SignUp"]
    B -->|"After register"| C["/profile-setup  ProfileSetup"]
    C -->|"Profile saved"| D["/dashboard  Dashboard"]
    A -->|"Sign In"| E["/signin  SignIn"]
    E -->|"After login"| D
    D -->|"Start Quiz"| F["/quiz  Quiz"]
    F -->|"Finished"| G["/result  Result"]
    G -->|"Back"| D
    A -->|"Splash screen"| H["/splash  Splash"]
    H --> A
```

**Route protection:** The `Navbar` component reads the JWT from `localStorage` and conditionally renders sign-in / sign-out controls. Routes like `/dashboard` and `/quiz` redirect unauthenticated users to `/signin`.

---

## 6. Data Flow Summary

```mermaid
flowchart LR
    subgraph Client
        A["User Action"] --> B["React Component"]
        B --> C["Service Module\n(auth.js / quizservice.js)"]
        C -->|"fetch / axios"| D["HTTP Request"]
    end

    subgraph Servers
        D --> E["Auth Backend\n(Express)"]
        D --> F["MockAPI\n(Quiz)"]
        E -->|"JWT + user data"| C
        F -->|"Question array"| C
    end

    C --> G["State / localStorage"]
    G --> B
    B --> H["Rendered UI"]
```

---

> These diagrams are rendered by GitHub's built-in Mermaid support. You can also paste them into [mermaid.live](https://mermaid.live) for an interactive preview.
