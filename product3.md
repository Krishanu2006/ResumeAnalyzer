# Resume Analyzer — Product Progress

## Project Overview

**Resume Analyzer** is an AI-powered full-stack application that analyzes a user's resume against a job description and generates an interview-preparation report.

### Core workflow

1. User signs up / logs in.
2. User provides resume, personal information, and job description.
3. Backend processes the resume and job description.
4. Gemini AI generates the analysis.
5. User receives:
   - Match score
   - Technical interview questions
   - Behavioral interview questions
   - 7-day preparation roadmap
6. Logged-in users can save and view previous reports.
7. Guest users can generate reports without permanently saving them.

---

# Current Technology Stack

## Frontend

- React
- Vite
- React Router
- Axios
- Recharts
- rc-slider
- react-datepicker
- lucide-react
- SCSS / normal CSS
- Nginx for production container serving

## Backend

- Node.js 22
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- Cookie-based authentication
- Multer
- pdf-parse
- Google Gemini / Google GenAI
- bcryptjs
- cookie-parser
- CORS
- dotenv

## Deployment / Infrastructure

- AWS EC2
- Ubuntu
- Docker
- Docker Compose-style container workflow
- GitHub
- Nginx
- PM2 knowledge/workflow available, but current production deployment is container-based

---

# What Has Been Completed

## 1. Frontend Application

The React + Vite frontend is substantially built.

### Completed areas

- Authentication UI
- Login / signup flow
- Protected routes
- Home page
- Resume analysis input flow
- Interview/report page
- Report navigation
- Guest report handling
- Saved report handling
- React Router navigation
- API integration
- Frontend production build

The frontend has also been successfully containerized.

### Frontend Docker setup

A multi-stage Docker build is being used:

- Node image for building the React application
- Nginx Alpine image for serving the production build

The production container has been tested locally.

Current local mapping:

```text
Host:      localhost:8080
Container: nginx:80
```

So the frontend can currently be accessed locally through:

```text
http://localhost:8080
```

---

# 2. Backend Application

The Express backend is working with the major application components in place.

### Completed areas

- Express server
- MongoDB connection
- Authentication
- JWT handling
- Cookies
- CORS
- Resume upload handling
- PDF parsing
- Gemini API integration
- Interview/report routes
- Report generation
- Database persistence
- API error handling
- Environment variable configuration

The backend has been successfully containerized.

### Backend Docker setup

Current production-style container:

```text
Host:      localhost:3000
Container: 3000
```

The backend has successfully started inside Docker and connected to MongoDB.

---

# 3. Authentication

Authentication has been implemented and tested.

The application uses:

- Signup
- Login
- JWT
- HTTP cookies
- Protected API routes
- `get-me` authentication check

There were earlier authentication issues where:

```text
GET /api/auth/get-me
```

returned:

```text
401 Unauthorized
```

Those issues were investigated and resolved sufficiently for successful authenticated requests.

A later test showed:

```text
GET /api/auth/get-me → 200
```

after successful login.

---

# 4. Database

MongoDB Atlas is being used as the production database.

The backend successfully established a database connection inside Docker.

Earlier, the following issue occurred:

```text
MongooseError:
The `uri` parameter to `openUri()` must be a string,
got "undefined"
```

This was caused by the MongoDB environment variable not being available inside the container.

The environment configuration was subsequently corrected.

Current status:

```text
Server is running on port 3000
Connected to Database
```

---

# 5. Dockerization

Both major application components have been Dockerized.

## Backend image

```text
api:latest
```

Backend container:

```text
resume-api
```

Port:

```text
3000:3000
```

## Frontend image

```text
resume-frontend:latest
```

Frontend container:

```text
resume-frontend
```

Port:

```text
8080:80
```

Both containers have been tested locally.

---

# 6. Local Docker Environment

The local Docker deployment is working.

Current architecture:

```text
                 ┌─────────────────────┐
                 │      Browser        │
                 └──────────┬──────────┘
                            │
                            │ :8080
                            ▼
                 ┌─────────────────────┐
                 │ Frontend Container  │
                 │ React Build + Nginx │
                 └──────────┬──────────┘
                            │
                            │ API requests
                            │ :3000
                            ▼
                 ┌─────────────────────┐
                 │  Backend Container  │
                 │   Node + Express    │
                 └──────────┬──────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
      ┌──────────────┐             ┌────────────────┐
      │ MongoDB      │             │ Gemini / GenAI │
      │ Atlas        │             │ API            │
      └──────────────┘             └────────────────┘
```

---

# 7. AWS EC2 Deployment

The project has now been deployed to an AWS EC2 instance.

Environment:

```text
AWS EC2
Ubuntu 26.04 LTS
Docker 29.1.3
Node.js 22.23.2
npm 10.9.8
```

SSH access to the EC2 instance has been successfully configured.

The project was transferred/deployed to the EC2 server and the Dockerized backend/frontend setup was brought onto the server.

The latest deployment work reached the point where the application was successfully deployed to EC2.

---

# Important Problems Already Solved

During development, several issues were encountered and fixed.

## Backend

- Missing MongoDB environment variable
- Docker environment variable loading
- Incorrect middleware import capitalization
- `upload.single is not a function`
- Route parameter mismatch (`interviewID` vs `interviewId`)
- Gemini authentication configuration
- CORS configuration
- Cookie authentication
- 401 authentication behavior
- Docker container naming conflicts

## Frontend

- React Router issues
- Missing `Navigate` import
- `useAuth` / authentication context issues
- Undefined array/filter errors
- Incorrect SCSS import path
- Linux case-sensitivity issues
- Vite build errors
- Docker/Nginx production serving

## Git

- `.env` files accidentally tracked
- GitHub secret scanning / push blocking
- `.gitignore` placement
- Removing environment files from Git tracking

---

# Current Project Status

## Overall

**The project has moved from local full-stack development to containerized deployment on AWS EC2.**

A simplified progress view:

| Area | Status |
|---|---|
| React frontend | Completed |
| Backend API | Completed |
| MongoDB integration | Completed |
| Gemini integration | Completed |
| Authentication | Completed |
| Resume upload | Completed |
| AI report generation | Completed |
| Docker backend | Completed |
| Docker frontend | Completed |
| Local Docker testing | Completed |
| AWS EC2 setup | Completed |
| AWS deployment | Completed |
| Production domain | Not yet completed |
| HTTPS / SSL | Not yet completed |
| Reverse proxy / unified domain | Next stage |
| CI/CD | Not yet completed |
| Production monitoring | Not yet completed |

---

# What Remains

The application is not necessarily at the final production-hardening stage yet.

The major remaining work is infrastructure and production polish.

## 1. Connect frontend and backend through the production URL

The frontend should no longer depend on:

```text
http://localhost:3000
```

For production, it should use the EC2/backend production URL or, preferably, a unified domain/reverse-proxy setup.

---

## 2. Configure Nginx as a reverse proxy

Recommended production architecture:

```text
                  Internet
                     │
                     ▼
              ┌─────────────┐
              │    Nginx    │
              │   :80/:443  │
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
     Frontend                Backend
     Nginx                   Node/Express
     container               container
       :80                     :3000
```

This allows:

```text
https://yourdomain.com
```

for the frontend and:

```text
https://yourdomain.com/api/...
```

for the backend.

---

# 3. HTTPS / SSL

After the domain is connected, SSL should be configured.

Recommended:

- Let's Encrypt
- Certbot
- Nginx

This is important because authentication relies on cookies and production traffic should be encrypted.

---

# 4. Environment Variables

Production secrets should remain outside Git.

Important variables include:

```text
MONGO_URI
JWT_SECRET
GOOGLE_API_KEY
GOOGLE_GEN_AI_API_KEY
```

The `.env` file must never be committed to GitHub.

---

# 5. Production CORS

CORS should be restricted to the actual production frontend origin.

Development:

```text
http://localhost:5173
```

Docker local:

```text
http://localhost:8080
```

Production should use the actual deployed frontend domain.

---

# 6. Production Cookie Configuration

For production authentication, verify:

```text
httpOnly
secure
sameSite
domain
```

especially after moving to HTTPS and a unified frontend/backend domain.

---

# 7. CI/CD

A future improvement is automated deployment.

Potential workflow:

```text
Git push
   ↓
GitHub Actions
   ↓
Build Docker images
   ↓
Deploy to EC2
   ↓
Restart containers
```

This would eliminate most manual deployment steps.

---

# 8. Monitoring and Reliability

Recommended later:

- Docker restart policies
- Health-check endpoints
- Container health checks
- Application logs
- Nginx logs
- Resource monitoring
- MongoDB monitoring
- Basic backup strategy

---

# Current Milestone

## Milestone 1 — Application Development

**Completed**

The main Resume Analyzer functionality has been implemented.

## Milestone 2 — Containerization

**Completed**

Frontend and backend are running as Docker containers.

## Milestone 3 — AWS Deployment

**Completed**

The application has been deployed to an AWS EC2 instance.

## Milestone 4 — Production Networking

**Next**

- Domain
- Nginx reverse proxy
- HTTPS
- Production CORS
- Production API URL
- Cookie verification

## Milestone 5 — Production Automation

**Future**

- GitHub Actions
- Automated Docker deployment
- Monitoring
- Health checks
- Backups

---

# Recommended Next Step

The immediate next step should **not** be adding random new features.

The technically sensible sequence is:

```text
1. Verify frontend on EC2
        ↓
2. Verify backend API on EC2
        ↓
3. Verify frontend → backend communication
        ↓
4. Configure production API URL
        ↓
5. Configure Nginx reverse proxy
        ↓
6. Connect domain
        ↓
7. Enable HTTPS
        ↓
8. Verify authentication cookies
        ↓
9. Test complete user workflow
        ↓
10. Add CI/CD
```

---

# Project Status Summary

**Resume Analyzer is currently beyond the development stage and has reached the AWS deployment stage.**

The core product is built, Dockerized, locally tested, and deployed to EC2.

The next major transition is:

> **EC2 deployment → production-ready public application**

The remaining work is primarily deployment hardening, networking, security, HTTPS, and automation rather than rebuilding the core application.
