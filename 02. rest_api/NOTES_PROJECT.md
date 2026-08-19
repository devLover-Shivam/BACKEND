# Notes REST API — Express.js

This project is a simple **REST API for managing notes** built using **Node.js and Express.js**.

The purpose of this project is to understand the fundamentals of:

* Creating an Express application
* Separating application configuration from server startup
* Middleware
* HTTP methods
* REST API routes
* Request and response objects
* Request body
* Route parameters
* HTTP status codes
* CRUD operations
* Exporting and importing modules
* Testing APIs using Postman

---

# 1. Project Structure

The project follows a simple separation between the **application logic** and the **server startup logic**.

```text
01_server/
│
├── node_modules/
├── package-lock.json
├── package.json
│
├── server.js
│
└── src/
    └── app.js
```

### `server.js`

The root `server.js` file is responsible for:

* Importing the Express application
* Starting the server
* Defining the port on which the server will listen

### `src/app.js`

The `app.js` file is responsible for:

* Creating the Express application
* Registering middleware
* Defining API routes
* Handling requests and responses
* Exporting the Express application

This separation follows the basic idea of **Separation of Concerns**.

```text
server.js
    ↓
Server Startup

app.js
    ↓
Application Configuration
    ↓
Middleware + Routes + Request Handling
```

---

# 2. Installing Express

First, initialize the Node.js project:

```bash
npm init -y
```

Then install Express:

```bash
npm install express
```

This creates or updates:

```text
package.json
package-lock.json
node_modules/
```

Express is added as a dependency in `package.json`.

---

# 3. Creating the Express Application

Inside `src/app.js`:

```javascript
const express = require('express');

const app = express();
```

### What happens here?

```text
require("express")
        ↓
Express package is loaded
        ↓
express()
        ↓
Express application is created
        ↓
stored inside app
```

The `app` object represents our Express application.

We use this object to:

* Register middleware
* Create routes
* Configure the application

---

# 4. JSON Middleware

```javascript
app.use(express.json());
```

This is an important middleware for our API.

When the client sends JSON data:

```json
{
    "title": "My Note",
    "description": "Learning backend"
}
```

Express needs to parse that JSON so that our application can access it through:

```javascript
req.body
```

Therefore:

```text
Client
   ↓
JSON Request Body
   ↓
express.json()
   ↓
req.body
```

Without this middleware, Express will not automatically make incoming JSON request data available through `req.body`.

---

# 5. Notes Data

For this initial project, we are storing notes inside an array:

```javascript
const notes = [];
```

Each note is represented as an object:

```javascript
{
    title: "My First Note",
    description: "Learning backend"
}
```

Multiple notes can therefore look like:

```javascript
const notes = [
    {
        title: "My First Note",
        description: "Learning backend"
    },
    {
        title: "My Second Note",
        description: "Learning Express"
    }
];
```

### Important

This is only **temporary in-memory storage**.

The data will disappear whenever the server restarts.

Later, we will replace this array with a proper database such as MongoDB.

---

# 6. POST — Create a Note

Route:

```javascript
app.post('/notes', (req, res) => {

    notes.push(req.body);

    res.status(201).json({
        message: "note created successfully"
    });

});
```

The `POST` method is used when we want to create a new resource.

### Request

The client can send:

```text
POST /notes
```

with JSON:

```json
{
    "title": "My First Note",
    "description": "Learning backend"
}
```

### What happens?

```text
Client
   ↓
POST /notes
   ↓
Express
   ↓
express.json()
   ↓
req.body
   ↓
notes.push(req.body)
   ↓
Note stored in notes array
   ↓
201 Response
```

The `201 Created` status code indicates that a new resource was successfully created.

---

# 7. Testing with Postman

Since we don't have a frontend yet, we can use **Postman** to act as the client.

For example:

```text
POST http://localhost:3000/notes
```

Body:

```json
{
    "title": "My First Note",
    "description": "Learning backend"
}
```

Postman allows us to:

* Send HTTP requests
* Add request bodies
* Add headers
* Test different API endpoints
* Inspect responses
* Check HTTP status codes

So during backend development:

```text
Postman
   ↓
API Request
   ↓
Express Backend
   ↓
API Response
   ↓
Postman
```

---

# 8. GET — Fetch Notes

Route:

```javascript
app.get('/notes', (req, res) => {

    res.status(200).json({
        message: "Notes Fetched Successfully!",
        notes: notes
    });

});
```

`GET` is used to retrieve data.

Request:

```text
GET /notes
```

The backend responds with:

```json
{
    "message": "Notes Fetched Successfully!",
    "notes": [
        {
            "title": "My First Note",
            "description": "Learning backend"
        }
    ]
}
```

### Why can POST and GET have the same `/notes` path?

Because the **HTTP method is also part of the API definition**.

```text
POST /notes
    ↓
Create a note

GET /notes
    ↓
Fetch notes
```

Same resource, different operation.

---

# 9. DELETE — Delete a Note

Route:

```javascript
app.delete('/notes/:index', (req, res) => {

    const index = req.params.index;

    delete notes[index];

    res.status(200).json({
        message: "note deleted successfully!"
    });

});
```

The `DELETE` method is used to remove a resource.

---

## Dynamic Route Parameter

Notice:

```text
/notes/:index
```

The `:index` part is a **dynamic route parameter**.

For example:

```text
DELETE /notes/0
DELETE /notes/1
DELETE /notes/2
```

Here:

```text
/notes
```

is static.

While:

```text
0
1
2
```

can change depending on which note we want to delete.

---

# 10. `req.params`

Express makes route parameters available through:

```javascript
req.params
```

For example, if the client sends:

```text
DELETE /notes/2
```

then:

```javascript
req.params.index
```

will contain:

```text
"2"
```

Therefore:

```javascript
const index = req.params.index;
```

stores the requested index.

The flow is:

```text
DELETE /notes/2
        ↓
:index = 2
        ↓
req.params.index
        ↓
index variable
        ↓
notes[index]
```

---

# 11. PATCH — Update a Note

Route:

```javascript
app.patch('/notes/:index', (req, res) => {

    const index = req.params.index;

    const description = req.body.description;

    notes[index].description = description;

    res.status(200).json({
        message: "notes updated successfully!"
    });

});
```

`PATCH` is generally used when we want to **partially update an existing resource**.

In our example, we only update the `description`.

For example:

```text
PATCH /notes/0
```

Request body:

```json
{
    "description": "Updated description"
}
```

The flow is:

```text
PATCH /notes/0
        ↓
req.params.index
        ↓
Find note at index 0
        ↓
req.body.description
        ↓
Update description
        ↓
Send response
```

---

# 12. HTTP Methods Used

Our API currently implements four basic operations:

| Method | Endpoint        | Purpose                 |
| ------ | --------------- | ----------------------- |
| POST   | `/notes`        | Create a note           |
| GET    | `/notes`        | Fetch all notes         |
| DELETE | `/notes/:index` | Delete a note           |
| PATCH  | `/notes/:index` | Partially update a note |

This is the basic idea behind **CRUD**:

```text
C → Create  → POST
R → Read    → GET
U → Update  → PATCH
D → Delete  → DELETE
```

---

# 13. HTTP Status Codes

The API uses status codes to communicate the result of a request.

### `200 OK`

Used when the request was successfully processed.

Used here for:

```text
GET
DELETE
PATCH
```

### `201 Created`

Used when a new resource has been successfully created.

Used here for:

```text
POST /notes
```

So:

```text
POST
 ↓
Resource created
 ↓
201 Created
```

---

# 14. `req` and `res`

Express route handlers commonly receive two important objects:

```javascript
(req, res)
```

### `req` — Request

Contains information sent **from the client to the server**.

Examples:

```javascript
req.body
req.params
req.query
req.headers
```

### `res` — Response

Used by the server to send information **back to the client**.

Examples:

```javascript
res.send()
res.json()
res.status()
```

Basic idea:

```text
Client
   │
   │ Request
   ▼
  req
   │
   ▼
Express Route
   │
   ▼
  res
   │
   │ Response
   ▼
Client
```

---

# 15. Exporting the Application

At the end of `app.js`:

```javascript
module.exports = app;
```

We export the Express application so that another file can use it.

We are **not starting the server here**.

Instead:

```text
app.js
   ↓
Create + Configure Express app
   ↓
Export app
```

Then `server.js` imports it.

---

# 16. Root `server.js`

Our root `server.js` contains:

```javascript
const app = require("./src/app");

app.listen(3000, () => {
    console.log("Server Is Running On Port 3000");
});
```

This file has a much simpler responsibility:

> Start the server.

### First line

```javascript
const app = require("./src/app");
```

This imports the Express application exported from:

```text
src/app.js
```

The flow is:

```text
server.js
    ↓
require("./src/app")
    ↓
src/app.js executes
    ↓
Express app is created
    ↓
app is exported
    ↓
server.js receives the app
```

---

# 17. Starting the Server

```javascript
app.listen(3000, () => {
    console.log("Server Is Running On Port 3000");
});
```

`app.listen()` tells the application to start listening for incoming network requests on port `3000`.

Our server will therefore be available at:

```text
http://localhost:3000
```

The callback:

```javascript
() => {
    console.log("Server Is Running On Port 3000");
}
```

runs once the server starts listening successfully.

---

# 18. Complete Architecture

The complete application flow is:

```text
                    server.js
                       │
                       │ require()
                       ▼
                    src/app.js
                       │
              ┌────────┴────────┐
              │                 │
          Middleware          Routes
              │                 │
       express.json()     ┌─────┼─────┐
                          │     │     │
                         POST  GET  PATCH/DELETE
                          │     │     │
                          └─────┼─────┘
                                │
                              notes[]
                                │
                                ▼
                             Response
                                │
                                ▼
                              Client
```

---

# 19. Why Separate `app.js` and `server.js`?

We could technically write everything inside one file.

However, separating them gives each file a clear responsibility.

### `app.js`

Responsible for:

```text
Application Logic
    ↓
Middleware
    ↓
Routes
    ↓
Request Handling
```

### `server.js`

Responsible for:

```text
Server Startup
    ↓
Port Configuration
    ↓
app.listen()
```

This is an example of **Separation of Concerns**.

As the application grows, this separation becomes increasingly useful.

---

# 20. Complete Request Example

Suppose we send:

```text
POST http://localhost:3000/notes
```

with:

```json
{
    "title": "Backend",
    "description": "Learning Express"
}
```

The complete execution looks like:

```text
1. Client sends POST request
          ↓
2. Request reaches port 3000
          ↓
3. Express receives the request
          ↓
4. express.json() parses JSON body
          ↓
5. Express finds POST /notes
          ↓
6. Route handler executes
          ↓
7. req.body contains note data
          ↓
8. notes.push(req.body)
          ↓
9. Note is stored in memory
          ↓
10. Server sends 201 response
          ↓
11. Client receives response
```

Response:

```json
{
    "message": "note created successfully"
}
```

---

# 21. Current Limitation

This project currently uses:

```javascript
const notes = [];
```

as storage.

That means the notes exist only in the server's memory.

If we stop the server:

```text
Server stopped
     ↓
Memory cleared
     ↓
notes array becomes empty
```

So this is **not persistent storage**.

In a real backend application, we would use a database such as MongoDB, PostgreSQL, or MySQL.

---
