# Uber Clone Backend

A backend server for an Uber-like ride-sharing app built with Node.js, Express, MongoDB, and Socket.IO. Supports RESTful APIs and real-time location updates for drivers.

## 🚀 Features

-   **Real-time tracking** via Socket.IO:

    -   Live driver location updates.
    -   Room-based socket communication for trips.

-   **REST APIs** for core actions:

    -   User & driver authentication (JWT).
    -   Ride request, acceptance, and completion.
    -   Fetch ride history & active trips.

-   **State management**:

    -   In-memory or database-backed ride state handling.

-   **MongoDB integration**:

    -   Stores users, drivers, rides, and locations.

-   **Clean architecture**:

    -   Organized routes/controllers/services.
    -   Middleware for auth, validation, error handling.

## 💠 Tech Stack

-   **Runtime**: Node.js
-   **Web framework**: Express.js
-   **Real-time comms**: Socket.IO
-   **Database**: MongoDB with Mongoose
-   **Auth**: JWT

## 🧹 Getting Started

### Prerequisites

-   Node.js (v14+)
-   MongoDB (local or Atlas)
-   (Optional) Redis for scaling sockets

### Installation

```bash
git clone <repo_url>
cd backend
npm install
```

### Configuration

Create a `.env` file in the root with:

```ini
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>
```

Optional variables:

```ini
REDIS_URL=<your_redis_url>
```

### Running Locally

```bash
npm run dev   # uses nodemon
# or
npm start     # production mode
```

## 🔁 REST API Endpoints

| Method | Endpoint                  | Description               |
| -----: | ------------------------- | ------------------------- |
|   POST | `/api/auth/signup`        | Register user or driver   |
|   POST | `/api/auth/login`         | Authenticate & return JWT |
|   POST | `/api/rides/request`      | Rider requests a ride     |
|   POST | `/api/rides/:id/accept`   | Driver accepts a ride     |
|   POST | `/api/rides/:id/complete` | Mark ride as completed    |
|    GET | `/api/rides`              | List user/driver rides    |
|    GET | `/api/rides/active`       | Get current active trip   |

## 🔌 Real-Time (Socket.IO)

-   Connect to Socket.IO server.
-   **Events**:

    -   `join:ride` – join driver to ride room.
    -   `driver:location` – emit location updates to rider.

-   **Ride flow**:

    -   Rider requests → backend matches driver → server emits `ride:assigned`.
    -   Driver joins room, starts emitting location.
    -   Rider receives `driver:location` in real time.

## ✅ Testing

-   Use **Postman** or **Insomnia** for API testing.
-   Optionally include **Jest** or **Mocha** for unit tests.
-   For real-time, test with **Socket.IO client** tools or your mobile frontend.

## 🏗️ Architecture Overview

```
src/
├── controllers/      // Handles request/response logic
├── services/         // Business & DB logic
├── models/           // Mongoose schemas
├── routes/           // Express route definitions
├── middleware/       // Auth, validation, error handling
└── sockets/          // Socket.IO event handlers
```

## ✅ Production Considerations

-   Use **Redis Adapter** for Socket.IO if scaling across instances.
-   Deploy with **PM2** or Docker containers.
-   Secure environment variables and enforce HTTPS.
-   Add rate limiting and input validation middleware.

---

## 📚 Contributing

Contributions are welcome! Please submit PRs or open issues to discuss feature ideas and fixes.

---

## 📍 License

Distributed under the MIT License. See `LICENSE` for details.
