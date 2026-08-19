# Backend Fundamentals — 20 MCQ Assessment

This assessment covers the backend concepts learned so far, including Node.js, NPM, Express.js, HTTP methods, REST APIs, middleware, routing, request/response objects, ports, and basic backend architecture.

---

# Questions

## Question 1

What is the primary purpose of Express.js in a Node.js backend application?

**A.** To store data permanently in a database
**B.** To provide a framework for building servers and handling HTTP requests/routes
**C.** To replace JavaScript with a backend-specific language
**D.** To manage Git repositories

---

## Question 2

What does `npm init -y` primarily do?

**A.** Installs Express.js
**B.** Creates the `node_modules` folder
**C.** Initializes a Node.js project and creates `package.json` with default values
**D.** Starts the Node.js server

---

## Question 3

What is the purpose of `app.listen(3000)` in an Express application?

**A.** It creates a new API endpoint at `/3000`
**B.** It tells the server to listen for incoming requests on port `3000`
**C.** It sends a response with status code `3000`
**D.** It connects the application to MongoDB on port `3000`

---

## Question 4

What does `express.json()` do in an Express application?

**A.** Converts JavaScript responses into HTML
**B.** Parses incoming JSON request bodies and makes the data available through `req.body`
**C.** Converts JSON into a database
**D.** Sends JSON responses automatically

---

## Question 5

Which HTTP method is primarily used to create a new resource in a REST API?

**A.** GET
**B.** DELETE
**C.** POST
**D.** PATCH

---

## Question 6

In this route:

```javascript
app.get('/notes', (req, res) => {
```

what does `'/notes'` represent?

**A.** HTTP method
**B.** Port number
**C.** Route/path (resource endpoint)
**D.** Request body

---

## Question 7

In this route:

```javascript
app.delete('/notes/:index', (req, res) => {
```

what does `:index` represent?

**A.** A fixed value that can never change
**B.** A dynamic route parameter
**C.** A query parameter
**D.** The request body

---

## Question 8

If the client sends:

```text
DELETE /notes/2
```

what will `req.params.index` contain?

**A.** `"/notes/2"`
**B.** `"index"`
**C.** `"2"`
**D.** `2` automatically as a number

---

## Question 9

Which status code is most appropriate when a new note has been successfully created?

**A.** `200`
**B.** `201`
**C.** `204`
**D.** `404`

---

## Question 10

What is the main purpose of `package-lock.json`?

**A.** It contains the application's source code
**B.** It stores the exact resolved versions and dependency tree of installed packages
**C.** It stores environment variables and API keys
**D.** It starts the Node.js server

---

## Question 11

Why is `node_modules` generally added to `.gitignore`?

**A.** It contains sensitive passwords by default
**B.** Node.js cannot run if `node_modules` is pushed
**C.** It can be very large and can be recreated using `npm install` from the project dependencies
**D.** Git does not support JavaScript files inside it

---

## Question 12

What is the purpose of:

```javascript
module.exports = app;
```

in `app.js`?

**A.** It starts the server on port 3000
**B.** It sends `app` as an HTTP response
**C.** It makes the `app` object available to another file that imports it
**D.** It creates a new Express application

---

## Question 13

In this code:

```javascript
app.post('/notes', (req, res) => {
    notes.push(req.body);
});
```

what does `req.body` contain?

**A.** The port number of the server
**B.** Data sent by the client in the request body
**C.** The URL path of the request
**D.** The HTTP status code

---

## Question 14

Which HTTP method is generally used to partially update an existing resource?

**A.** GET
**B.** POST
**C.** PATCH
**D.** DELETE

---

## Question 15

What is the main difference between `req.params` and `req.body`?

**A.** `req.params` contains request body data, while `req.body` contains route parameters
**B.** `req.params` contains dynamic route parameters, while `req.body` contains data sent in the request body
**C.** Both contain exactly the same type of data
**D.** `req.params` is used only with GET and `req.body` is used only with POST

---

## Question 16

What does Separation of Concerns mean in your current backend structure?

**A.** Keeping all backend code inside `server.js`
**B.** Separating different responsibilities, such as server startup in `server.js` and application/routes configuration in `app.js`
**C.** Using different ports for every API
**D.** Separating frontend and backend into different programming languages

---

## Question 17

Which statement best describes a REST API?

**A.** An API that can only use the GET method
**B.** An API that uses HTTP and resource-based endpoints following REST principles
**C.** An API that can only communicate with databases
**D.** An API that always requires MongoDB

---

## Question 18

What happens when this code runs?

```javascript
app.get('/notes', (req, res) => {
    res.status(200).json({
        notes: notes
    });
});
```

**A.** A new note is created
**B.** All notes stored in the `notes` array are sent to the client
**C.** The `notes` array is deleted
**D.** The server starts listening on port 200

---

## Question 19

What is the purpose of `res.json()`?

**A.** It parses incoming JSON request data
**B.** It sends a JSON response back to the client
**C.** It creates a JSON database
**D.** It converts the server into JSON format

---

## Question 20

Suppose the client sends:

```text
PATCH /notes/1
```

with:

```json
{
    "description": "Updated description"
}
```

Which combination is used in your code to update the note?

**A.** `req.body.index` and `req.params.description`
**B.** `req.params.index` and `req.body.description`
**C.** `req.query.index` and `req.params.description`
**D.** `req.body.index` and `req.body.description`

---

# Answer Key

| Question | Correct Answer |
| -------- | -------------- |
| 1        | B              |
| 2        | C              |
| 3        | B              |
| 4        | B              |
| 5        | C              |
| 6        | C              |
| 7        | B              |
| 8        | C              |
| 9        | B              |
| 10       | B              |
| 11       | C              |
| 12       | C              |
| 13       | B              |
| 14       | C              |
| 15       | B              |
| 16       | B              |
| 17       | B              |
| 18       | B              |
| 19       | B              |
| 20       | B              |

---

# Explanations

## 1. Express.js — B

Express.js is a Node.js web framework used to build servers and APIs more easily.

It provides features for:

* Creating routes
* Handling HTTP requests
* Sending responses
* Using middleware
* Building REST APIs

---

## 2. `npm init -y` — C

This command initializes a Node.js project and creates a `package.json` file.

The `-y` flag automatically accepts the default configuration.

```text
npm init -y
     ↓
package.json
```

---

## 3. `app.listen(3000)` — B

This starts the Express server and tells it to listen for incoming requests on port `3000`.

```javascript
app.listen(3000);
```

The server can then be accessed locally using:

```text
http://localhost:3000
```

---

## 4. `express.json()` — B

`express.json()` is middleware that parses incoming JSON request bodies.

For example:

```json
{
    "title": "My Note"
}
```

becomes accessible through:

```javascript
req.body
```

The distinction to remember:

```text
express.json()
→ Parses incoming JSON

res.json()
→ Sends outgoing JSON
```

---

## 5. POST — C

`POST` is generally used to create a new resource.

For our notes API:

```text
POST /notes
```

creates a new note.

---

## 6. `/notes` — C

`/notes` is the route/path or endpoint.

The complete API definition is:

```text
GET /notes
```

Here:

```text
GET
→ HTTP method

/notes
→ Route/path
```

---

## 7. `:index` — B

`:index` is a dynamic route parameter.

For example:

```text
/notes/0
/notes/1
/notes/2
```

The value can change depending on the request.

It can be accessed through:

```javascript
req.params.index
```

---

## 8. `req.params.index` — C

If the request is:

```text
DELETE /notes/2
```

then:

```javascript
req.params.index
```

contains:

```javascript
"2"
```

Route parameters are provided as strings.

If a number is required:

```javascript
const index = Number(req.params.index);
```

---

## 9. `201 Created` — B

`201` means the resource was successfully created.

For example:

```javascript
res.status(201).json({
    message: "note created successfully"
});
```

Common statuses:

```text
200 → Successful request
201 → Resource created
404 → Resource not found
500 → Server error
```

---

## 10. `package-lock.json` — B

`package-lock.json` records the resolved versions and dependency tree of the project's dependencies.

The relationship is:

```text
package.json
    ↓
Required dependencies

package-lock.json
    ↓
Resolved dependency versions

node_modules
    ↓
Installed packages
```

---

## 11. `node_modules` — C

`node_modules` contains installed packages and their dependencies.

It can become very large, so it is normally ignored by Git.

Instead, we commit:

```text
package.json
package-lock.json
```

and recreate dependencies using:

```bash
npm install
```

Therefore:

```gitignore
node_modules/
```

is standard practice.

---

## 12. `module.exports = app` — C

This exports the Express application so another file can import and use it.

In `app.js`:

```javascript
module.exports = app;
```

In `server.js`:

```javascript
const app = require("./src/app");
```

This allows us to keep application configuration separate from server startup.

---

## 13. `req.body` — B

`req.body` contains data sent by the client in the request body.

For example:

```json
{
    "title": "My Note",
    "description": "Learning Backend"
}
```

can be accessed using:

```javascript
req.body
```

This requires the JSON middleware:

```javascript
app.use(express.json());
```

---

## 14. PATCH — C

`PATCH` is generally used for partial updates.

For example:

```text
PATCH /notes/1
```

with:

```json
{
    "description": "Updated description"
}
```

updates only the description rather than replacing the entire note.

---

## 15. `req.params` vs `req.body` — B

`req.params` contains dynamic values from the URL.

Example:

```text
/users/10
```

```javascript
req.params.id
```

contains `"10"`.

`req.body` contains data sent inside the request body.

Example:

```json
{
    "name": "Shivam"
}
```

So:

```text
URL parameter
    ↓
req.params

Request body
    ↓
req.body
```

---

## 16. Separation of Concerns — B

Our project separates server startup from application configuration.

### `server.js`

```text
Start server
    ↓
app.listen()
```

### `app.js`

```text
Express application
    ↓
Middleware
    ↓
Routes
    ↓
Request handling
```

This makes the application easier to maintain as it grows.

---

## 17. REST API — B

A REST API is a web API designed around REST principles.

It commonly uses:

```text
HTTP methods
+
Resource-based URLs
+
Stateless requests
+
HTTP status codes
```

For example:

```text
GET    /notes
POST   /notes
PATCH  /notes/1
DELETE /notes/1
```

REST does not require a specific database.

---

## 18. `GET /notes` — B

The route:

```javascript
app.get('/notes', ...)
```

is used to retrieve notes.

The response:

```javascript
res.status(200).json({
    notes: notes
});
```

sends the contents of the `notes` array to the client.

Therefore:

```text
GET /notes
    ↓
Retrieve notes
    ↓
Send notes to client
```

---

## 19. `res.json()` — B

`res.json()` sends a JSON response to the client.

Example:

```javascript
res.json({
    message: "Success"
});
```

Remember:

```text
express.json()
→ Incoming JSON

res.json()
→ Outgoing JSON
```

---

## 20. `req.params.index` + `req.body.description` — B

The index comes from the URL:

```text
PATCH /notes/1
```

Therefore:

```javascript
req.params.index
```

identifies which note should be updated.

The new description comes from the request body:

```json
{
    "description": "Updated description"
}
```

Therefore:

```javascript
req.body.description
```

contains the new value.

The update becomes:

```javascript
const index = req.params.index;
const description = req.body.description;

notes[index].description = description;
```

The concept is:

```text
URL
 ↓
req.params.index
 ↓
Which resource?

Request Body
 ↓
req.body.description
 ↓
What should change?
```

---

