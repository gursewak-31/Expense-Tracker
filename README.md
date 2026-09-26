# Expense Tracker

A full-stack **Expense Tracker** application that allows users to create an account, securely log in, and manage their day-to-day expenses.

Users can add, view, update, and delete expenses, making it easier to keep track of their personal spending.

## 🚀 Features

* User registration and login
* Secure authentication using JWT
* Password protection
* Create and manage daily expenses
* Dashboard with expense overview
* View expense records
* Update expenses
* Delete expenses
* Expense categorization
* User-specific expense data
* MongoDB database integration
* REST API backend
* React frontend
* TypeScript-based backend
* Seed script for creating testing data
* Environment variable configuration

## 🛠️ Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Bootstrap

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* JSON Web Token (JWT)

### Other Tools

* npm
* Git
* GitHub

---

The project is divided into two main parts:

* `client` → React frontend
* `server` → Node.js/Express backend

---

# ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

* **Node.js**
* **npm**
* **MongoDB** or access to a MongoDB database
* **Git**

---

# 📥 Installation

## 1. Clone the Repository

Clone the project using Git:

```bash
git clone https://github.com/gursewak-31/Expense-Tracker.git
```

Move into the project directory:

```bash
cd Expense-Tracker
```

---

# 🔐 2. Configure Environment Variables

Both the frontend and backend contain an `.env.example` file.

These files show which environment variables are required by the project.

Create your actual `.env` file from the provided example and update the values according to your local configuration.

---

# 📦 3. Install Dependencies

Dependencies must be installed separately for the frontend and backend.

## Install Client Dependencies

From the project root:

```bash
cd client
npm install
```

## Install Server Dependencies

Then move to the server:

```bash
cd ../server
npm install
```

After this, both the frontend and backend dependencies will be installed.

---

# 🗄️ 4. MongoDB Setup

The application uses **MongoDB** to store user accounts and expense data.

You need to provide a valid MongoDB connection string in the server `.env` file.

Make sure the database is accessible from your application before starting the backend.

---

# 🌱 5. Seed Testing Data

The backend provides a seed script that creates sample data for testing.

First, make sure you are inside the `server` folder:

```bash
cd server
```

Then run:

```bash
npm run seed
```

The seed script creates a testing account and associated testing data.

### Test Account

```text
Email:    test@gmail.com
Password: 12345678
```

You can use these credentials to log into the application and test its functionality.

> The seed script requires a working MongoDB connection, so make sure your server `.env` configuration is correct before running it.

---

# ▶️ Running the Application

The frontend and backend need to be started separately.

## Frontend

Open a terminal and move into the client folder:

```bash
cd client
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the frontend URL in the terminal.

---

## Backend

Open another terminal.

**Important:** Backend commands must be executed from the `server` folder, not from the project root.

```bash
cd server
```

Because the backend is written in TypeScript, first build the project:

```bash
npm run build
```

After the build completes, start the backend:

```bash
npm start
```

The backend server will start using the configuration provided in the server `.env` file.

---

# 🧪 Testing the Application

After both the frontend and backend are running:

1. Open the frontend URL provided by Vite.
2. Log in using the seeded test account:

```text
Email: test@gmail.com
Password: 12345678
```

3. Explore the expense management features.
4. Create, update, and delete expenses.
5. You can also create a new account to test the registration functionality.

---

# 🔄 Development Workflow

For development, you will normally need **two terminals**.

### Terminal 1 — Frontend

```bash
cd client
npm run dev
```

### Terminal 2 — Backend

```bash
cd server
npm run build
npm start
```

If you modify TypeScript backend code, run the build command again before restarting the server.

---

# 📌 Important Commands

| Location | Command         | Purpose                           |
| -------- | --------------- | --------------------------------- |
| `client` | `npm install`   | Install frontend dependencies     |
| `server` | `npm install`   | Install backend dependencies      |
| `client` | `npm run dev`   | Start frontend development server |
| `server` | `npm run build` | Compile TypeScript backend        |
| `server` | `npm start`     | Start backend server              |
| `server` | `npm run seed`  | Create testing data               |

> **Note:** All backend commands shown above must be run while your terminal is inside the `server` directory.

---

# 📄 Project Information

This project is available for learning and development purposes.

**Created by Gursewak Singh**

---

# 🙏 Thank You

If you found this project useful, interesting, or helpful for your learning:

* ⭐ **Star the repository** to show your support.
* ❤️ Feel free to share the project with others who may find it useful.
* 🐛 If you find a bug or have a suggestion, feel free to open an issue.
* 🤝 Contributions and improvements are always welcome.

**Thanks for visiting the repository! 🚀**
