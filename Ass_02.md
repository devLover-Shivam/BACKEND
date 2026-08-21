# ASSIGNMENT_02

## Questions

### Question 1/20

In our Notes backend, what is the primary responsibility of `server.js`?

**A.** Define all API routes and handle CRUD operations
**B.** Define the MongoDB schema and create the Mongoose model
**C.** Load environment variables, establish the database connection, and start the Express server
**D.** Store all notes permanently inside MongoDB

---

### Question 2/20

What is the primary purpose of `express.json()`?

**A.** It connects Express to MongoDB.
**B.** It converts MongoDB documents into JSON.
**C.** It parses incoming JSON request bodies so that the data becomes available through `req.body`.
**D.** It converts `req.body` into a MongoDB document automatically.

---

### Question 3/20

What is the main purpose of a **Mongoose Schema**?

**A.** It starts the Express server.
**B.** It defines the structure and types of data that documents should follow.
**C.** It stores the MongoDB connection URI.
**D.** It sends HTTP requests from Postman.

---

### Question 4/20

What is the purpose of this line?

```javascript
const noteModel = mongoose.model("note", noteSchema);
```

**A.** It creates a new MongoDB cluster.
**B.** It converts the schema into a Mongoose Model that can be used to interact with the database.
**C.** It connects Express directly to MongoDB.
**D.** It creates a new `.env` file.

---

### Question 5/20

What happens when we execute:

```javascript
const notes = await noteModel.find();
```

**A.** It returns a single document or `null`.
**B.** It creates a new document in MongoDB.
**C.** It returns an array containing the matching documents.
**D.** It deletes all documents from the collection.
**E.** All of the above
**F.** None of the above

---

### Question 6/20

Which of the following statements about the **`.env` file** in our project are correct?

**A.** It can store sensitive configuration such as the MongoDB connection URI.
**B.** It should generally not be pushed to GitHub.
**C.** `.gitignore` can be used to prevent Git from tracking it.
**D.** `dotenv` can load variables from it into `process.env`.
**E.** All of the above
**F.** None of the above

---

### Question 7/20

Which statement about **MongoDB Atlas and MongoDB Compass** is correct?

**A.** MongoDB Compass is the actual cloud database where our notes are permanently stored.
**B.** MongoDB Atlas hosts the MongoDB deployment, while Compass is a GUI client used to connect to and inspect the database.
**C.** MongoDB Compass replaces Mongoose in the Node.js backend.
**D.** MongoDB Atlas is only used for testing APIs through Postman.
**E.** All of the above
**F.** None of the above

---

### Question 8/20

Consider:

```javascript
app.post("/notes", async (req, res) => {

    const data = req.body;

    await noteModel.create({
        title: data.title,
        description: data.description
    });

    res.status(201).json({
        message: "Note created successfully"
    });
});
```

Which statements are correct?

**A.** `req.body` contains the JSON data sent by the client.
**B.** `noteModel.create()` creates a new document in MongoDB.
**C.** `201` indicates successful resource creation.
**D.** The route uses the POST HTTP method.
**E.** All of the above
**F.** None of the above

---

### Question 9/20

What does `:id` represent in:

```text
/notes/:id
```

**A.** A fixed value that must always be written as `id`.
**B.** A dynamic route parameter whose actual value can be accessed using `req.params.id`.
**C.** A MongoDB database name.
**D.** A Mongoose Schema field.
**E.** All of the above
**F.** None of the above

---

### Question 10/20

Which statements correctly describe the relationship between **Schema, Model, and Mongoose**?

**A.** A Schema defines the structure of a document.
**B.** A Model is created using a Schema and provides methods for interacting with the database.
**C.** Mongoose acts as an ODM that helps Node.js applications work with MongoDB.
**D.** `noteModel.create()` can be used to create a document in MongoDB.
**E.** All of the above
**F.** None of the above

---

### Question 11/20

What is the main reason we **should not commit the `.env` file to GitHub**?

**A.** `.env` files make Node.js applications slower.
**B.** GitHub cannot store `.env` files.
**C.** `.env` may contain sensitive credentials such as database usernames, passwords, and connection URIs.
**D.** MongoDB cannot read environment variables.
**E.** All of the above
**F.** None of the above

---

### Question 12/20

Consider:

```javascript
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
    console.log("Server is running");
});
```

Suppose MongoDB is **down** and `connectDB()` internally does:

```javascript
async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
}
```

What is the most important problem with the current `server.js`?

**A.** `app.listen()` will always wait for `connectDB()` because `connectDB()` is an async function.
**B.** The server can start listening even though the MongoDB connection has not successfully been established.
**C.** `mongoose.connect()` is synchronous, so `await` has no effect.
**D.** Express cannot run on port `3000` until MongoDB returns an array.
**E.** All of the above
**F.** None of the above

---

### Question 13/20

Consider:

```javascript
async function startServer() {

    await connectDB();

    app.listen(3000, () => {
        console.log("Server is running");
    });

}

startServer();
```

Assume `connectDB()` rejects because MongoDB is unavailable.

What happens?

**A.** `app.listen()` still runs because `await` only pauses the current line.
**B.** `app.listen()` runs first and MongoDB connects afterward.
**C.** Execution stops at `await connectDB()` because the Promise rejects, so `app.listen()` is not reached unless the error is handled.
**D.** MongoDB automatically reconnects and `app.listen()` waits indefinitely.
**E.** All of the above
**F.** None of the above

---

### Question 14/20

Consider:

```javascript
app.get("/notes", async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({
        notes: notes
    });

});
```

Suppose MongoDB is temporarily unavailable and:

```javascript
await noteModel.find();
```

throws/rejects.

What is the **most accurate** statement?

**A.** Express automatically converts the database error into a `500` response in every case.
**B.** The request handler encounters an error, and without appropriate error handling, the API does not intentionally send a proper error response to the client.
**C.** `find()` automatically returns `[]` whenever MongoDB is unavailable.
**D.** The error is automatically converted into a `404 Not Found` response.
**E.** All of the above
**F.** None of the above

---

### Question 15/20

Consider:

```javascript
const note = await noteModel.findOne({
    title: "Learning MongoDB"
});
```

Which statement is **most accurate**?

**A.** `findOne()` always returns an array.
**B.** `findOne()` creates a new document if no matching document exists.
**C.** `findOne()` returns the first matching document, or `null` if no matching document is found.
**D.** `findOne()` deletes the first matching document.
**E.** All of the above
**F.** None of the above

---

### Question 16/20

Consider:

```javascript
await noteModel.findOneAndUpdate(
    { _id: id },
    { description: description }
);
```

Suppose the database contains:

```json
{
    "_id": "123",
    "title": "MongoDB",
    "description": "Learning basics"
}
```

and the request is:

```text
PATCH /notes/123
```

with:

```json
{
    "description": "Learning advanced MongoDB"
}
```

What will happen?

**A.** A completely new note will be created.
**B.** The document with `_id: "123"` will have its `description` updated, while `title` remains unchanged.
**C.** The entire document will be replaced, so `title` will be removed.
**D.** The document will be deleted and recreated.
**E.** All of the above
**F.** None of the above

---

### Question 17/20

Why did we separate `db.js`, `note.model.js`, and `app.js` instead of putting everything inside `server.js`?

**A.** It is required by Node.js; otherwise Node.js will refuse to execute the application.
**B.** It follows separation of concerns, making database connection logic, data modeling, API configuration/routes, and server startup easier to manage independently.
**C.** It makes MongoDB faster because each file gets its own database connection.
**D.** It prevents Express from using middleware.
**E.** All of the above
**F.** None of the above

---

### Question 18/20

Your application contains:

```javascript
await mongoose.connect(process.env.MONGO_URI);
```

and your `.env` contains:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/halley
```

Your `.gitignore` contains:

```gitignore
.env
```

Which statement is **most accurate**?

**A.** `.gitignore` encrypts the MongoDB password so even someone who obtains the `.env` can never read it.
**B.** `process.env.MONGO_URI` automatically hides the password from every process running on the machine.
**C.** `.gitignore` prevents Git from tracking the `.env` file, while environment variables keep sensitive configuration outside the source code.
**D.** Once `.env` is in `.gitignore`, an already committed MongoDB password can never be recovered from Git history.
**E.** All of the above
**F.** None of the above

---

### Question 19/20

Consider:

```javascript
app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const deletedNote = await noteModel.findOneAndDelete({
        _id: id
    });

    res.status(200).json({
        message: "Note Deleted Successfully!"
    });

});
```

A client sends:

```text
DELETE /notes/999
```

but **no document with `_id = 999` exists**.

Which statement is the most accurate?

**A.** `findOneAndDelete()` automatically creates a new document with `_id = 999`.
**B.** `findOneAndDelete()` returns `null`, because no matching document was found, but the current code still sends a success response because we aren't checking `deletedNote`.
**C.** MongoDB automatically returns HTTP `404` to the client.
**D.** Express automatically knows that no MongoDB document was found and changes `200` to `404`.
**E.** All of the above
**F.** None of the above

---

### Question 20/20

Consider the complete request:

```text
POST /notes
```

with:

```json
{
    "title": "Learn Backend",
    "description": "Connect Express with MongoDB"
}
```

Your application has:

```text
server.js
   ↓
app.js
   ↓
noteModel
   ↓
Mongoose
   ↓
MongoDB Atlas
```

Which sequence **most accurately represents what happens from the moment the request is sent until the note is stored?**

**A.**

```text
Postman
 ↓
server.js
 ↓
MongoDB
 ↓
app.listen()
 ↓
noteModel
```

**B.**

```text
Postman
 ↓
Express
 ↓
express.json()
 ↓
POST /notes route
 ↓
req.body
 ↓
noteModel.create()
 ↓
Mongoose
 ↓
MongoDB Atlas
 ↓
Document stored
 ↓
Express sends response
```

**C.**

```text
Postman
 ↓
MongoDB Compass
 ↓
noteSchema
 ↓
server.js
 ↓
MongoDB
```

**D.**

```text
Postman
 ↓
Mongoose
 ↓
Express
 ↓
.env
 ↓
MongoDB
```

**E.** All of the above
**F.** None of the above

---

# Answer Key

| Question | Correct Answer |
| -------- | -------------- |
| 1        | C              |
| 2        | C              |
| 3        | B              |
| 4        | B              |
| 5        | C              |
| 6        | E              |
| 7        | B              |
| 8        | E              |
| 9        | B              |
| 10       | E              |
| 11       | C              |
| 12       | B              |
| 13       | C              |
| 14       | B              |
| 15       | C              |
| 16       | B              |
| 17       | B              |
| 18       | C              |
| 19       | B              |
| 20       | B              |

---

# Detailed Explanations

## 1. `server.js` — Answer: C

`server.js` is responsible for the **startup of the application**.

Its responsibilities include:

```text
.env
 ↓
dotenv
 ↓
Database connection
 ↓
Express app
 ↓
app.listen()
```

The API routes belong in `app.js`, the database connection belongs in `db.js`, and the schema/model belongs in `note.model.js`.

---

## 2. `express.json()` — Answer: C

`express.json()` is middleware that parses incoming JSON request bodies.

For example:

```json
{
    "title": "Learn MongoDB",
    "description": "Practice Mongoose"
}
```

becomes accessible through:

```javascript
req.body
```

The flow is:

```text
Client
 ↓
JSON request
 ↓
express.json()
 ↓
req.body
 ↓
Route handler
```

It does **not** connect Express to MongoDB.

---

## 3. Mongoose Schema — Answer: B

A Schema defines the expected structure of a document.

For example:

```javascript
const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});
```

This tells Mongoose that a Note contains:

```text
title → String
description → String
```

Think of a Schema as a **blueprint**.

---

## 4. Mongoose Model — Answer: B

This:

```javascript
mongoose.model("note", noteSchema);
```

creates a Mongoose Model from the Schema.

The Schema answers:

> What should a note look like?

The Model answers:

> How do I interact with notes?

The model provides methods such as:

```javascript
noteModel.create()
noteModel.find()
noteModel.findOneAndUpdate()
noteModel.findOneAndDelete()
```

---

## 5. `find()` — Answer: C

`find()` returns an **array**.

If multiple documents exist:

```javascript
[
    {},
    {},
    {}
]
```

If no documents match:

```javascript
[]
```

This differs from `findOne()`, which returns one document or `null`.

---

## 6. `.env` — Answer: E

All statements are correct.

`.env` can contain:

```env
MONGO_URI=...
```

`dotenv` loads it into:

```javascript
process.env.MONGO_URI
```

`.gitignore` prevents Git from tracking `.env`.

The important security flow is:

```text
.env
 ↓
dotenv
 ↓
process.env
 ↓
mongoose.connect()
```

---

## 7. Atlas vs Compass — Answer: B

MongoDB Atlas is the cloud platform hosting the MongoDB deployment.

MongoDB Compass is a GUI client.

Think:

```text
MongoDB Atlas
    ↓
Actual database deployment

MongoDB Compass
    ↓
GUI used to inspect/manage it
```

Compass does not replace Mongoose in the backend.

---

## 8. POST `/notes` — Answer: E

All statements are correct.

The complete flow is:

```text
POST /notes
 ↓
req.body
 ↓
noteModel.create()
 ↓
MongoDB
 ↓
201 Created
```

`201` is specifically appropriate when a resource has been successfully created.

---

## 9. Dynamic route parameter — Answer: B

In:

```text
/notes/:id
```

`:id` is dynamic.

For:

```text
/notes/123
```

we get:

```javascript
req.params.id
```

which contains:

```text
"123"
```

This allows us to identify a particular note.

---

## 10. Schema + Model + Mongoose — Answer: E

All statements are correct.

The relationship is:

```text
Mongoose
 ↓
Schema
 ↓
Model
 ↓
MongoDB
```

Mongoose is an ODM that provides an abstraction for working with MongoDB from Node.js.

---

## 11. `.env` security — Answer: C

The MongoDB URI can contain:

```text
Username
Password
Cluster information
Database name
```

Therefore, exposing it publicly can expose the database credentials.

`.env` keeps these values outside the source code.

However, remember:

> `.env` itself is not encryption.

It is simply a way to keep configuration/secrets outside the committed source code.

---

## 12. `connectDB()` and `app.listen()` — Answer: B

This is a crucial asynchronous JavaScript concept.

Calling:

```javascript
connectDB();
```

doesn't automatically make the next statement wait.

An async function returns a Promise.

Therefore:

```javascript
connectDB();

app.listen(3000);
```

can result in:

```text
connectDB()
 ↓
Promise pending
 ↓
app.listen()
 ↓
Server starts
```

A better startup flow is to explicitly wait for the database connection.

---

## 13. `await connectDB()` — Answer: C

With:

```javascript
await connectDB();
```

execution inside the async function waits for the Promise.

If the Promise rejects:

```text
connectDB()
 ↓
Rejected
 ↓
Error
 ↓
app.listen() isn't reached
```

unless the error is handled.

This is why database startup logic should normally have error handling.

---

## 14. Database failure vs 404 — Answer: B

`404 Not Found` generally means that the requested resource/route doesn't exist.

A MongoDB connection failure is a server-side problem.

Therefore, don't confuse:

```text
404
→ Resource/route not found
```

with:

```text
500-level error
→ Server-side/internal problem
```

Also, Express doesn't magically turn every database error into a perfect HTTP response. Proper error handling needs to be implemented.

---

## 15. `findOne()` — Answer: C

`findOne()` returns:

```text
Matching document
        ↓
{ ... }
```

or:

```text
No match
        ↓
null
```

Compare:

```text
find()
    ↓
[]

findOne()
    ↓
null
```

This distinction becomes very important when checking whether a particular resource exists.

---

## 16. `findOneAndUpdate()` — Answer: B

The first object is the **filter**:

```javascript
{
    _id: id
}
```

It tells MongoDB:

> Find this document.

The second object is the **update**:

```javascript
{
    description: description
}
```

It tells MongoDB:

> Change this field.

Therefore:

```text
Find _id = 123
 ↓
Update description
 ↓
Keep title unchanged
```

This is the basic idea behind partial updates.

---

## 17. Separation of Concerns — Answer: B

Each file has a focused responsibility:

```text
server.js
→ Server startup

app.js
→ Express + routes + middleware

db.js
→ Database connection

note.model.js
→ Schema + Model
```

This makes the application easier to understand, debug, test, and expand.

Putting everything into one giant file might work for a tiny project, but it becomes painful as the application grows.

---

## 18. `.gitignore` — Answer: C

`.gitignore` tells Git:

> Don't track this file.

It does **not**:

* Encrypt the file
* Hide the file from your computer
* Remove secrets already committed
* Revoke exposed credentials

If a secret has already been pushed:

```text
Secret exposed
 ↓
Rotate/revoke credential
 ↓
Generate new credential
 ↓
Update .env
```

The old credential should no longer be trusted.

---

## 19. `findOneAndDelete()` returning `null` — Answer: B

If no document matches:

```javascript
const deletedNote = await noteModel.findOneAndDelete({
    _id: id
});
```

then:

```javascript
deletedNote === null
```

The current code doesn't check this and therefore could still return:

```text
200 OK
Note Deleted Successfully
```

even though nothing was deleted.

A better API would eventually do:

```javascript
if (!deletedNote) {
    return res.status(404).json({
        message: "Note not found"
    });
}
```

This introduces an important backend principle:

> **Always inspect the result of important database operations.**

---

## 20. Complete POST Flow — Answer: B

This is the complete lifecycle:

```text
Postman / Frontend
        ↓
HTTP Request
        ↓
Express
        ↓
express.json()
        ↓
POST /notes
        ↓
req.body
        ↓
noteModel.create()
        ↓
Mongoose
        ↓
MongoDB Atlas
        ↓
Document Stored
        ↓
Express
        ↓
HTTP Response
        ↓
Client
```

This is the fundamental architecture of your current Notes backend.

The important mental model is:

```text
Express
→ handles HTTP requests

Mongoose
→ provides the bridge between Node.js and MongoDB

Schema
→ defines document structure

Model
→ performs database operations

MongoDB
→ permanently stores the data
```
