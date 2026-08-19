# APIs and REST APIs

## What is an API?

**API (Application Programming Interface)** is a way for two software systems to communicate with each other.

For example, when a frontend application needs user data, it can send a request to the backend through an API.

```text
Frontend
   │
   │ API Request
   ▼
Backend
   │
   │ API Response
   ▼
Frontend
```

An API acts as a **contract/interface** between different parts of a software system.

---

## Types of APIs

APIs can be classified in different ways.

### 1. Web APIs

APIs that communicate over the web using protocols such as HTTP/HTTPS.

Examples:

* REST API
* SOAP API
* GraphQL API
* WebSocket API

### 2. Library APIs

These are interfaces provided by programming libraries or frameworks.

For example:

```javascript
array.push(10);
```

`push()` is part of JavaScript's Array API.

### 3. Operating System APIs

These allow applications to interact with operating system functionality such as files, processes, memory, and networking.

---

# REST API

**REST (Representational State Transfer)** is an architectural style used to design web APIs.

A REST API generally uses HTTP methods to perform operations on resources.

For example, suppose we have a `users` resource.

| HTTP Method | Endpoint    | Purpose               |
| ----------- | ----------- | --------------------- |
| GET         | `/users`    | Get users             |
| GET         | `/users/10` | Get a specific user   |
| POST        | `/users`    | Create a user         |
| PUT         | `/users/10` | Replace a user        |
| PATCH       | `/users/10` | Update part of a user |
| DELETE      | `/users/10` | Delete a user         |

---

## How a REST API Works

A client sends an HTTP request:

```text
GET /users
```

The backend processes the request and sends a response:

```json
{
    "users": [
        {
            "id": 1,
            "name": "Shivam"
        }
    ]
}
```

The response is commonly represented using **JSON** because it is lightweight and easy for different systems to understand.

---

## REST API Characteristics

A REST-style API generally follows these principles:

* Uses HTTP methods such as GET, POST, PUT, PATCH, and DELETE.
* Treats data as **resources**.
* Uses URLs to identify resources.
* Is generally **stateless** — each request contains the information needed to process it.
* Commonly uses JSON for request and response data.
* Uses HTTP status codes to communicate the result.

---

## REST API in Backend Development

With Express.js, a REST endpoint can be created like this:

```javascript
app.get("/users", (req, res) => {
    res.json({
        users: [
            { id: 1, name: "Shivam" }
        ]
    });
});
```

Now a client can send:

```text
GET /users
```

and receive the user data as a response.

The basic idea is:

```text
Client
   │
   │ HTTP Request
   ▼
REST API
   │
   │ Process request
   ▼
Database / Application Logic
   │
   │ Data
   ▼
REST API
   │
   │ HTTP Response
   ▼
Client
```

## Key Takeaway

An **API** provides a way for software systems to communicate.

A **REST API** is a common way of building web APIs using HTTP and resource-based URLs.

```text
API
 ↓
Communication between software systems

REST API
 ↓
Web API designed around REST principles
 ↓
HTTP + Resources + Stateless Requests
```
