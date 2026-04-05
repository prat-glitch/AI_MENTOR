# 🗺️ AI Mentor — Visual Workflow

This document describes the complete user journey and system architecture of AI Mentor using visual diagrams.

---

## 1. User Journey (Page Flow)

```mermaid
flowchart TD
    A([🌐 User visits app]) --> B[Landing Page\n/]
    B --> C{Has account?}
    C -- No --> D[Sign Up\n/signup]
    C -- Yes --> E[Sign In\n/signin]

    D --> F[Auth Backend\nPOST /signup\nJWT issued]
    E --> G[Auth Backend\nPOST /login\nJWT issued]

    F --> H[Profile Setup\n/profile-setup]
    G --> I{Profile\ncomplete?}
    I -- No --> H
    I -- Yes --> J[Dashboard\n/dashboard]
    H --> J

    J --> K[Start Quiz\n/quiz]
    K --> L[Answer Questions\nFetched from MockAPI]
    L --> M[Submit Quiz]
    M --> N[Result Page\n/result]
    N --> J
```

---

## 2. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant FE as React Frontend
    participant BE as Express Auth Backend
    participant LS as localStorage

    U->>FE: Enter email + password
    FE->>BE: POST /signup or /login
    BE->>BE: Hash password (bcrypt) or verify
    BE->>BE: Sign JWT (1h expiry)
    BE-->>FE: { token }
    FE->>LS: Save token
    FE->>U: Redirect to Dashboard / Profile Setup

    note over FE,BE: Protected routes send\nAuthorization: Bearer <token>
    FE->>BE: GET /me (with token)
    BE->>BE: Verify JWT
    BE-->>FE: { user: email }
```

---

## 3. Quiz Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as React Frontend
    participant API as MockAPI\n(Quiz Questions)

    U->>FE: Click "Start Next Questate"
    FE->>API: GET /mentor/api/questions
    API-->>FE: Array of question objects
    FE->>U: Render quiz questions one by one

    loop For each question
        U->>FE: Select answer
        FE->>FE: Track score & responses
    end

    U->>FE: Submit quiz
    FE->>FE: Calculate results
    FE->>U: Navigate to /result with score
```

---

## 4. Component Architecture

```mermaid
graph TD
    App[App.jsx] --> Router[router.jsx]

    Router --> Landing[Landing.jsx]
    Router --> Splash[Splash.jsx]
    Router --> SignIn[SignIn.jsx]
    Router --> SignUp[SignUp.jsx]
    Router --> ProfileSetup[ProfileSetup.jsx]
    Router --> Dashboard[Dashboard.jsx]
    Router --> Quiz[Quiz.jsx]
    Router --> Result[Result.jsx]

    Dashboard --> Navbar[Navbar.jsx]
    Dashboard --> PlanCard[PlanCard.jsx]
    Dashboard --> SegProg[SegmentedProgressCircle.jsx]
    Quiz --> Navbar

    SignIn --> AuthSvc[services/auth.js]
    SignUp --> AuthSvc
    Quiz --> QuizSvc[services/quizservice.js]

    AuthSvc -->|POST /signup\nPOST /login\nGET /me| AuthAPI[(Auth Backend\nRender)]
    QuizSvc -->|GET /questions| MockAPI[(MockAPI)]
```

---

## 5. High-Level System Architecture

```mermaid
graph LR
    subgraph Browser
        FE[React 19\nVite Frontend]
    end

    subgraph "Render (Cloud)"
        BE[Express.js\nAuth Server\n:5000]
    end

    subgraph "MockAPI (Cloud)"
        QDB[(Quiz Questions\nREST API)]
    end

    FE -- "JWT Auth\n(signup/login/me)" --> BE
    FE -- "Fetch questions" --> QDB
```

---

## 6. Dashboard State Overview

```mermaid
stateDiagram-v2
    [*] --> Dashboard : Authenticated user
    Dashboard --> Quiz : Start Next Questate
    Dashboard --> Dashboard : Adjust plan\n(Easier / Harder)
    Quiz --> Result : Submit answers
    Result --> Dashboard : Back to dashboard
    Dashboard --> [*] : Logout
```

---

## 7. Route Map

| Route | Component | Auth Required |
|---|---|---|
| `/` | `Landing.jsx` | No |
| `/signup` | `SignUp.jsx` | No |
| `/signin` | `SignIn.jsx` | No |
| `/profile-setup` | `ProfileSetup.jsx` | Yes |
| `/dashboard` | `Dashboard.jsx` | Yes |
| `/quiz` | `Quiz.jsx` | Yes |
| `/result` | `Result.jsx` | Yes |
