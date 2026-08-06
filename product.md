# Resume Analyzer

## 1. Product Overview

Resume Analyzer is an AI-powered web application that helps users evaluate how well their resume and profile match a target job description and prepare for the corresponding interview.

The application uses the Gemini API to analyze the user's resume/profile against a job description and generates four primary outputs:

1. **Match Score**
2. **Technical Questions**
3. **Behavioral Questions**
4. **7-Day Preparation Roadmap**

The product supports both **guest users** and **authenticated users**.

Guest users can generate and view an analysis without creating an account. Authenticated users receive the same analysis functionality and additionally have access to their **previous reports**.

---

## 2. Problem Statement

Job applicants often need to answer several questions before applying or preparing for an interview:

- How closely does my resume match this job?
- Which technical areas should I prepare?
- What behavioral questions might I be asked?
- What should I study over the next few days?

These tasks are usually performed manually across multiple tools and resources.

Resume Analyzer combines these activities into one workflow using AI.

---

## 3. Product Goals

### Primary Goals

- Analyze a resume against a target job description.
- Provide an understandable match score.
- Generate relevant technical interview questions.
- Generate relevant behavioral interview questions.
- Generate a structured 7-day preparation roadmap.
- Allow users to use the analyzer without mandatory authentication.
- Allow authenticated users to save and revisit previous reports.

### Secondary Goals

- Keep the guest experience frictionless.
- Encourage users to create an account when they want persistent report history.
- Keep authentication and report ownership enforced by the backend.

---

## 4. User Types

### 4.1 Guest User

A guest user can:

- Open the Resume Analyzer.
- Provide a resume and/or self-description.
- Provide a job description.
- Generate an AI-powered report.
- View the generated report.

A guest user cannot:

- View previous reports.
- Retrieve reports from the database.
- Persist report history to their account.

The guest report is temporary and is not stored as a user-owned database report.

### 4.2 Authenticated User

An authenticated user can:

- Use the analyzer.
- Generate reports.
- Have generated reports saved to their account.
- View previous reports.
- Open an individual saved report.
- Generate/download the resume PDF associated with a saved report.

---

## 5. Core User Flow

### Guest Flow

```text
Open Application
       ↓
Enter Resume / Self Description
       ↓
Enter Job Description
       ↓
Generate Report
       ↓
Backend optionally authenticates user
       ↓
Gemini API generates analysis
       ↓
Guest report is returned without database persistence
       ↓
Guest views report
```

### Authenticated Flow

```text
Login / Sign Up
       ↓
Enter Resume / Self Description
       ↓
Enter Job Description
       ↓
Generate Report
       ↓
Backend identifies authenticated user
       ↓
Gemini API generates analysis
       ↓
Report is saved with user ID
       ↓
User views report
       ↓
Report becomes available in Previous Reports
```

---

## 6. Authentication Flow

Authentication uses JWT-based authentication stored in an HTTP cookie.

### Registration

```text
POST /api/auth/register
```

The backend:

1. Validates username, email, and password.
2. Checks whether the account already exists.
3. Hashes the password using bcrypt.
4. Creates the user.
5. Creates a JWT.
6. Stores the JWT in the `token` cookie.

### Login

```text
POST /api/auth/login
```

The backend:

1. Finds the user by email.
2. Compares the password using bcrypt.
3. Creates a JWT.
4. Stores the JWT in the `token` cookie.

### Current User

```text
GET /api/auth/get-me
```

The endpoint returns the current authenticated user's details.

A guest request may receive:

```text
401 Unauthorized
```

This is expected when no valid authentication cookie exists. The frontend treats this as an unauthenticated state.

### Logout

```text
POST /api/auth/logout
```

The backend clears the token cookie and records the token in the blacklist.

---

## 7. Authentication States

The frontend uses the authentication context to represent the current state.

```text
isLoading = true
    ↓
Authentication state is being determined

isLoading = false + user = null
    ↓
Guest

isLoading = false + user exists
    ↓
Authenticated user
```

The frontend must not interpret `user === null` as "guest" while authentication is still loading.

---

## 8. Resume Analysis

### Inputs

The analyzer accepts:

- Resume file
- Self-description
- Job description

The user should provide at least one profile source:

- Resume
- Self-description

The job description is required for matching the candidate to the target role.

### Backend Endpoint

```text
POST /api/interview/
```

The request uses multipart form data.

Fields:

```text
resume
selfDescription
jobDescription
```

### Processing

The backend:

1. Reads the uploaded resume.
2. Extracts its text.
3. Reads the self-description and job description.
4. Sends the information to the Gemini-powered AI service.
5. Receives the generated interview report.
6. Checks whether the request belongs to an authenticated user.

### Guest

The generated report is returned directly and is not saved as a database report.

### Authenticated User

The generated report is saved with:

```text
user: req.user.id
```

The report is therefore associated with the authenticated user.

---

## 9. AI-Generated Report

The AI report is expected to contain the following major sections.

### 9.1 Match Score

A score representing how closely the candidate's profile matches the target job description.

### 9.2 Technical Questions

Technical interview questions generated based on the candidate's profile and target role.

### 9.3 Behavioral Questions

Behavioral interview questions relevant to the candidate and target position.

### 9.4 7-Day Preparation Roadmap

A structured preparation plan covering the user's preparation over seven days.

Additional AI-generated fields such as:

- Target role
- Skill gaps
- Report title

may also be included when returned by the AI service.

---

## 10. Report Persistence

The central product distinction is:

```text
Guest
    → Generate
    → View
    → No persistence

Authenticated
    → Generate
    → Save
    → View
    → Revisit later
```

This allows the analyzer to remain accessible without requiring registration while still providing a reason for users to create an account.

---

## 11. Report APIs

### Generate Report

```text
POST /api/interview/
```

Used by both guests and authenticated users.

### Get Individual Report

```text
GET /api/interview/report/:interviewId
```

Authenticated users only.

The backend ensures that the requested report belongs to the current user:

```text
_id = interviewId
AND
user = req.user.id
```

This prevents one authenticated user from retrieving another user's report by ID.

### Get All Previous Reports

```text
GET /api/interview/
```

Authenticated users only.

Reports are returned in descending creation order.

### Generate Resume PDF

```text
POST /api/interview/resume/pdf/:interviewReportId
```

Authenticated users only.

The endpoint generates a resume PDF using information stored in the saved report.

---

## 12. Frontend Structure

Current feature-oriented structure:

```text
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── interview/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── style/
│
└── style/
```

Relevant interview pages include:

```text
interview/
└── pages/
    ├── Home.jsx
    ├── Interview.jsx
    └── PreviousReportsPage.jsx
```

---

## 13. Frontend Routing

### Public Analyzer

```text
/
```

The analyzer must be accessible to both guests and authenticated users.

### Authenticated Report

```text
/interview/:interviewId
```

This route is protected because it retrieves a saved report belonging to an authenticated user.

### Guest Report

```text
/interview/guest
```

This route is not protected because a guest must be able to view the report they just generated.

The guest report is passed temporarily through frontend navigation state rather than being retrieved from the database.

### Previous Reports

```text
/interview/reports
```

This route is protected using `ProtectedRoute`.

---

## 14. Protected Routes

The application uses a `ProtectedRoute` component for authenticated-only pages.

Conceptually:

```text
isLoading
    ↓
Show loading state

No user
    ↓
Redirect to /login

User exists
    ↓
Render protected page
```

The frontend protection improves navigation and user experience.

The backend remains responsible for actual authorization and data security.

---

## 15. Previous Reports

The Previous Reports page is available only to authenticated users.

It calls:

```text
GET /api/interview/
```

and displays saved reports, potentially including:

- Report title
- Match score
- Creation date
- Link to open the report

Selecting a report navigates to:

```text
/interview/:interviewId
```

The individual report is then fetched from the backend.

---

## 16. Frontend API Service

The interview service is responsible for communicating with the backend.

Current responsibilities:

```text
generateInterviewReport()
getInterviewReportById()
getAllInterviewReports()
generateResumePdf()
```

The Axios instance uses:

```text
baseURL: http://localhost:3000
withCredentials: true
```

`withCredentials` is necessary because authentication is cookie-based.

---

## 17. Security and Authorization

The application should follow these principles:

### Authentication

JWT is used to identify authenticated users.

### Password Security

Passwords are hashed using bcrypt and are never stored as plaintext.

### Report Ownership

A report should always be queried using both:

```text
report ID
+
authenticated user ID
```

rather than trusting a user ID supplied by the frontend.

### Frontend vs Backend Security

Frontend route protection is not sufficient for security.

For example:

```text
ProtectedRoute
```

protects the UI route, while:

```text
authUser middleware
```

protects the backend API.

The backend must remain the source of truth for authorization.

---

## 18. Current Backend Structure

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── services/
```

Major responsibilities:

### Controllers

Handle HTTP requests and responses.

### Middleware

Handle authentication, optional authentication, and file processing.

### Models

Represent users, reports, and token blacklist data.

### Routes

Expose authentication and interview/report endpoints.

### Services

Handle AI-related operations and other business logic.

---

## 19. Current Product Architecture

```text
                   ┌─────────────────────┐
                   │   React Frontend    │
                   └──────────┬──────────┘
                              │
                              │ HTTP + Cookie
                              ↓
                   ┌─────────────────────┐
                   │   Express Backend  │
                   └──────────┬──────────┘
                              │
                     optionalAuth
                              │
                  ┌───────────┴───────────┐
                  │                       │
               Guest                 Authenticated
                  │                       │
                  └───────────┬───────────┘
                              ↓
                       Gemini AI Service
                              │
                              ↓
                       Generated Report
                              │
                     ┌────────┴────────┐
                     │                 │
                  Guest             User
                     │                 │
                 Return only       Save to DB
                     │                 │
                     └────────┬────────┘
                              ↓
                         React Report
```

---

## 20. Current Development Status

### Completed

- Authentication system
- Registration
- Login
- Logout
- JWT cookie authentication
- Protected routes
- Optional authentication for report generation
- Gemini-powered report generation
- Guest report generation
- Authenticated report persistence
- Individual saved report retrieval
- Previous reports API
- Previous Reports frontend page
- Guest report route
- Frontend API service methods for reports

### Current Work

The remaining work is primarily integration and testing:

1. Verify guest report generation.
2. Verify guest report display.
3. Verify authenticated report generation.
4. Verify authenticated report persistence.
5. Verify Previous Reports page.
6. Verify individual saved report retrieval.
7. Verify resume PDF generation for authenticated users.
8. Improve UI and error handling.

---

## 21. Important UX Principle

Authentication should not be a prerequisite for the core value proposition.

The intended experience is:

```text
Guest:
"Let me try the analyzer."

        ↓

Generate useful report.

        ↓

"Want to keep your reports?"

        ↓

Sign up / Log in.

        ↓

Future reports are saved automatically.
```

This keeps the initial experience low-friction while making account creation useful rather than mandatory.

---

## 22. Future Improvements

Potential future features include:

- Delete previous reports
- Rename reports
- Search and filter report history
- Compare multiple reports
- Save favorite reports
- Export full analysis as PDF
- Share reports
- Track preparation progress across the 7-day roadmap
- Resume version comparison
- Job application tracking
- More detailed skill-gap analysis
- Analytics dashboard for authenticated users

These features are outside the current MVP scope.
