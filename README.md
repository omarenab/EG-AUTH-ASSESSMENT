# Full-Stack Authentication Application

A full-stack authentication application built with **React, Vite,
TypeScript, NestJS, and MongoDB**. It supports user registration,
sign-in, and access to a protected home/profile page, with an emphasis
on reusable components, clear separation of concerns, and secure
authentication practices.

## Tech Stack

### Frontend

-   **React + TypeScript** --- component-based user interface.
-   **Vite** --- development server and build tooling.
-   **Tailwind CSS** --- utility-first styling.
-   **React Router** --- client-side routing and protected routes.
-   **Context API** --- shared authentication state.
-   **React Hook Form** --- form state and submission handling.
-   **Zod** --- client-side form validation.
-   **Axios** --- HTTP requests to the backend.

### Backend

-   **NestJS + TypeScript** --- Node.js backend framework.
-   **MongoDB** --- NoSQL database.
-   **Mongoose** --- Object Data Modeling (ODM).
-   **JWT** --- authentication.
-   **HTTP-only cookies** --- storage and transmission of the
    authentication token.
-   **Bcrypt** --- password hashing.
-   **NestJS Guards** --- protection of authenticated endpoints.
-   **Validation Pipe** --- Implementing Validation pipe to sanitize data.
-   **Class Validator** --- validation of incoming request data.
-   **Class Transformer** --- transformation of incoming request data.
-   **Rate limiting** --- limiting repeated requests to reduce
    brute-force attempts and abusive traffic.

## Project Structure

The repository contains two separate applications:

``` text
project/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Hooks/
│   │   ├── Pages/
│   │   ├── Services/
│   │   └── Types/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

*The folder names above illustrate the overall structure. Adjust them if
your actual directory or naming conventions differ.*

## Features

### Frontend

-   Three application pages: Sign In, Sign Up, and Home.
-   Reusable components for consistent UI and maintainability.
-   Form validation with Zod.
-   Authentication state managed centrally with Context API.
-   Protected routing for authenticated users.
-   API communication handled through a dedicated service layer.
-   Loading and error states for form submissions and authentication
    checks.

### Backend

-   User registration and sign-in endpoints.
-   Passwords hashed with bcrypt before being stored.
-   JWT authentication using an HTTP-only cookie instead of exposing the
    token to JavaScript or storing it in local storage.
-   Protected profile endpoint secured with a NestJS Guard.
-   Request validation and transformation using Class Validator and
    Class Transformer.
-   Rate limiting to restrict excessive requests.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (use a version compatible with the
    dependencies in `package.json`).
-   npm.
-   A MongoDB Atlas database or a local MongoDB instance.

### 1. Clone the repository

``` bash
git clone <repository-url>
cd <project-folder>
```

## Frontend Setup

### 2. Open the frontend directory

``` bash
cd frontend
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Configure frontend environment variables

Create a `.env` file in the `frontend` directory:

``` env
VITE_BACKEND_URL=http://localhost:8000
```

Make sure this variable name matches the one used by your Axios/API
configuration.

### 5. Start the frontend

``` bash
npm run dev
```

Vite will print the local development URL in the terminal (commonly
`http://localhost:5173`).

## Backend Setup

Open a **second terminal** from the repository root.

### 6. Open the backend directory

``` bash
cd backend
```

### 7. Install dependencies

``` bash
npm install
```

### 8. Configure backend environment variables

Create a `.env.development` file in the `backend` directory:

``` env
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
```

Replace the placeholder values with your own configuration. Ensure that
the NestJS `ConfigModule` is configured to load `.env.development` in
development mode.

**Important:** Do not commit environment files or real secrets to
version control. Add `.env`, `.env.*`, and other secret-bearing files to
`.gitignore`, while keeping an example environment file with placeholder
values if needed.

### 9. Start the backend

``` bash
npm run start:dev
```

The backend will run at `http://localhost:3000`, assuming the configured
port is `3000`.

## API Endpoints

The following are the application's expected endpoint paths; verify them
against the route decorators in your controllers.

  ------------------------------------------------------------------------
  Method            Endpoint           Description       Authentication
  ----------------- ------------------ ----------------- -----------------
  `POST`            `/auth/signup`     Register a user   Not required

  `POST`            `/auth/signin`     Authenticate a    Not required
                                       user              

  `POST`            `/auth/logout`     Log out and clear Depends on
                                       the               implementation
                                       authentication    
                                       cookie            

  `GET`             `/users/me`         Retrieve the      Required
                                       authenticated     
                                       user's profile    
  ------------------------------------------------------------------------

The sign-in endpoint sets the authentication cookie. The browser sends
the cookie on subsequent requests when the frontend and backend
cookie/CORS settings allow it.


## Security Notes

-   **Password hashing:** Passwords are hashed with bcrypt before being
    saved to MongoDB.
-   **HTTP-only authentication cookie:** The JWT is stored in an
    HTTP-only cookie, making it inaccessible to client-side JavaScript.
    This reduces the risk of token theft through certain XSS attacks; it
    does not prevent XSS itself.
-   **Protected endpoints:** NestJS Guards verify authentication before
    allowing access to protected backend routes.
-   **Input validation:** Zod validates frontend form data, while Class
    Validator and Class Transformer handle backend request validation
    and transformation.
-   **Rate limiting:** Request limits help reduce brute-force attempts
    and abusive traffic. Rate limiting alone does not prevent
    distributed denial-of-service (DDoS) attacks.
-   **Cookie configuration:** `Secure`, `SameSite`, CORS credentials,
    and an appropriate CSRF strategy should be configured according to
    the deployment environment.


