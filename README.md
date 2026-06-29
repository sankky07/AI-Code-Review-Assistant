# 🤖 AI Code Review Assistant

> An AI-powered code review platform that analyzes GitHub repositories and generates intelligent code review reports using Large Language Models (LLMs).

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-success)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Overview

AI Code Review Assistant is a full-stack web application that integrates with GitHub to automatically review source code using an AI model.

Users can securely sign in with GitHub, browse their repositories, trigger AI-powered code reviews, and view detailed reports covering code quality, architecture, security, performance, bugs, code smells, and best practices.

The project demonstrates practical integration of:

- GitHub OAuth
- GitHub REST APIs
- Repository cloning
- Spring Boot REST APIs
- AI/LLM Integration
- React + Tailwind CSS
- PostgreSQL

---

## ✨ Features

### 🔐 Authentication

- GitHub OAuth 2.0 Login
- Secure Spring Security authentication
- Session-based authentication

### 📂 Repository Management

- Fetch GitHub repositories
- View repository details
- Open repository directly on GitHub

### 🤖 AI Code Review

- Clone repository automatically
- Scan supported source files
- Generate AI-powered code review
- Repository quality score
- Architecture analysis
- Bug detection
- Security review
- Performance analysis
- Code smell detection
- Best practice recommendations
- Improvement suggestions

### 📜 Review History

- View previous AI reviews
- Delete individual reviews
- Clear complete review history

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- GitHub API
- JGit
- Groq / Gemini API

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Lucide React
- React Hot Toast

## Database

- PostgreSQL

---

# 🏗 System Architecture

```
                    GitHub OAuth
                          │
                          ▼
                  Spring Boot Backend
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
  GitHub REST API     Clone Repository    PostgreSQL
        │
        ▼
 Source Code Scanner
        │
        ▼
     AI (Groq/Gemini)
        │
        ▼
 Structured Review Report
        │
        ▼
      React Dashboard
```

---

# 📁 Project Structure

```
AI-Code-Review-Assistant
│
├── backend
│   ├── ai
│   ├── auth
│   ├── github
│   ├── security
│   ├── user
│   └── ...
│
├── frontend
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── services
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/sankky07/AI-Code-Review-Assistant.git

cd AI-Code-Review-Assistant
```

---

## Backend Setup

```bash
cd backend
```

Create an `application.properties` file or configure environment variables.

Example:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

github.client.id=${GITHUB_CLIENT_ID}
github.client.secret=${GITHUB_CLIENT_SECRET}

groq.api.key=${GROQ_API_KEY}
```

Run:

```bash
./mvnw spring-boot:run
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8080
```

Run

```bash
npm run dev
```

---

# 📷 Screenshots

## Login

> *(Add Screenshot)*

---

## Dashboard

> *(Add Screenshot)*

---

## Repository Analysis

> *(Add Screenshot)*

---

## AI Review Report

> *(Add Screenshot)*

---

## Review History

> *(Add Screenshot)*

---

# 🧠 AI Review Sections

Each repository review contains:

- Overall Summary
- Architecture Review
- Bugs
- Security Issues
- Performance Issues
- Code Smells
- Best Practices
- Suggested Improvements
- Repository Score

---

# 🔒 Security

- GitHub OAuth Authentication
- Spring Security
- Session Authentication
- Environment Variable based API Keys
- Database Credentials stored securely

---

# 📈 Future Enhancements

- Pull Request Review
- Multiple AI Model Support
- Export Review as PDF
- GitHub Action Integration
- Team Workspaces
- Review Comparison
- Inline Code Suggestions
- Review Analytics Dashboard
- Dark & Light Theme

---

# 👨‍💻 Author

### Sanket Sahu

GitHub

https://github.com/sankky07

LinkedIn

(Add LinkedIn URL)

---

# ⭐ If you like this project

Please consider giving it a **Star ⭐** on GitHub.

It motivates me to build more open-source projects.

---

# 📄 License

This project is licensed under the MIT License.
