# Social Media Project --- Full Stack Flow

## 1. Project Overview

This is a full-stack social media application built to demonstrate how a
React frontend communicates with a Node/Express backend, how the backend
communicates with MongoDB, and how ImageKit handles uploaded images.

The current application supports two main operations:

1.  **Create a post**
    -   User selects an image and enters a caption.
    -   React creates `FormData`.
    -   Axios sends the multipart request to `POST /create-post`.
    -   Multer receives the image in memory as a Buffer.
    -   The backend sends the Buffer to ImageKit.
    -   ImageKit returns a public image URL.
    -   MongoDB stores the ImageKit URL and caption.
    -   React navigates to `/feed`.
2.  **Load the feed**
    -   React calls `GET /posts`.
    -   Express fetches posts from MongoDB through Mongoose.
    -   The response contains the ImageKit URLs and captions.
    -   React stores them in state.
    -   `posts.map()` renders each post.
    -   The browser uses each ImageKit URL to request and display the
        actual image.

**Core idea:** MongoDB stores the image URL, not the image file.
ImageKit stores/serves the actual image.

------------------------------------------------------------------------

## 2. Tech Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   Axios
-   React Router DOM
-   CSS

### Backend

-   Node.js
-   Express
-   Multer
-   Mongoose
-   CORS
-   dotenv

### External Services

-   MongoDB Atlas --- database
-   ImageKit --- cloud image storage and delivery

------------------------------------------------------------------------

## 3. High-Level Architecture

``` text
                    SOCIAL MEDIA APPLICATION
                              |
                +-------------+-------------+
                |                           |
             FRONTEND                    BACKEND
          React + Vite                Node + Express
                |                           |
                |       HTTP / JSON         |
                +-------------------------->|
                                            |
                              +-------------+-------------+
                              |                           |
                         MongoDB Atlas                 ImageKit
                           Database                  Image Service
                              |                           |
                              +-------------+-------------+
                                            |
                                       Image URL
                                            |
                                            v
                                       React Feed
```

The frontend and backend are two separate applications. During
development they normally run on different ports:

``` text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

They communicate through HTTP requests.

------------------------------------------------------------------------

## 4. Project Structure

``` text
04_socialMedia_Project/
|
+-- backend/
|   |
|   +-- server.js
|   +-- package.json
|   |
|   +-- src/
|       |
|       +-- app.js
|       |
|       +-- db/
|       |   +-- db.js
|       |
|       +-- models/
|       |   +-- post.model.js
|       |
|       +-- services/
|           +-- storage.service.js
|
+-- frontend/
    |
    +-- package.json
    +-- vite.config.js
    |
    +-- src/
        |
        +-- main.jsx
        +-- App.jsx
        +-- index.css
        |
        +-- pages/
            +-- CreatePost.jsx
            +-- Feed.jsx
```

------------------------------------------------------------------------

# 5. Backend Startup Flow

The backend starts from `backend/server.js`.

``` text
server.js
   |
   +-- dotenv loads environment variables
   |
   +-- imports Express app
   |
   +-- imports database connection
   |
   +-- connects to MongoDB
   |
   +-- starts Express on port 3000
```

The current entry point does:

``` js
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
    console.log("Server Is Running On 3000");
});
```

### Why dotenv is loaded

Secrets and configuration such as:

``` text
MONGO_URI
PRIVATE_IMAGEKIT
```

are read from environment variables rather than hard-coded into the
source.

------------------------------------------------------------------------

# 6. Database Connection

The database logic lives in:

``` text
backend/src/db/db.js
```

The project uses Mongoose:

``` js
await mongoose.connect(process.env.MONGO_URI);
```

The flow is:

``` text
server.js
   |
   | connectDB()
   v
db.js
   |
   | mongoose.connect(...)
   v
MongoDB Atlas
```

The frontend never connects directly to MongoDB.

The correct architecture is:

``` text
React
  |
  v
Express API
  |
  v
Mongoose
  |
  v
MongoDB
```

This keeps database credentials on the server.

------------------------------------------------------------------------

# 7. Post Model

The Mongoose model is:

``` text
backend/src/models/post.model.js
```

The schema currently contains:

``` js
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
});
```

A document therefore looks conceptually like:

``` json
{
    "_id": "...",
    "image": "https://ik.imagekit.io/...",
    "caption": "Beautiful Idea"
}
```

The important point is:

``` text
image = ImageKit URL
```

not:

``` text
image = actual image binary
```

------------------------------------------------------------------------

# 8. Why ImageKit Is Used

The project uses ImageKit to handle image storage/delivery.

The database does not need to contain the complete image file.

Instead:

``` text
Actual Image
     |
     v
  ImageKit
     |
     v
 Public Image URL
     |
     v
  MongoDB
```

MongoDB stores metadata and the reference to the image.

ImageKit handles the actual image asset.

------------------------------------------------------------------------

# 9. ImageKit Service

ImageKit logic is isolated in:

``` text
backend/src/services/storage.service.js
```

This is a service layer.

The route does not need to know all the details of the ImageKit SDK. It
simply calls:

``` js
uploadFile(buffer)
```

The service initializes ImageKit with:

``` js
privateKey: process.env.PRIVATE_IMAGEKIT
```

The private key therefore stays on the backend.

------------------------------------------------------------------------

# 10. Complete Image Upload Flow

This is the most important flow in the project.

``` text
User selects image
        |
        v
React file input
        |
        v
FormData
        |
        v
Axios POST /create-post
        |
        v
Express
        |
        v
Multer
        |
        v
req.file.buffer
        |
        v
ImageKit service
        |
        | Buffer -> Base64
        v
ImageKit
        |
        | returns URL
        v
MongoDB
        |
        | stores URL + caption
        v
Feed
```

------------------------------------------------------------------------

# 11. Step 1 --- Selecting the Image

`CreatePost.jsx` contains:

``` jsx
<input
    type="file"
    name="image"
    accept="image/*"
/>
```

The `name` is important because the backend uses:

``` js
upload.single("image")
```

Both sides therefore agree on the field name:

``` text
Frontend: name="image"
Backend: upload.single("image")
```

------------------------------------------------------------------------

# 12. Step 2 --- Creating FormData

When the form is submitted:

``` js
const formData = new FormData(e.target);
```

The browser collects:

``` text
FormData
|
+-- image   -> selected file
|
+-- caption -> entered text
```

This is necessary because the request contains a file.

------------------------------------------------------------------------

# 13. Step 3 --- Axios Sends the Request

The frontend sends:

``` js
axios.post(
    "http://localhost:3000/create-post",
    formData
)
```

The request travels:

``` text
React
   |
   | POST /create-post
   v
Express :3000
```

Axios handles the HTTP communication between frontend and backend.

------------------------------------------------------------------------

# 14. Step 4 --- Multer Receives the Image

The Express route is:

``` js
app.post(
    "/create-post",
    upload.single("image"),
    async (req, res) => {
        ...
    }
);
```

`upload.single("image")` is Multer middleware.

The project configures:

``` js
const upload = multer({
    storage: multer.memoryStorage()
});
```

Therefore the image is kept in memory instead of being written to a
local uploads folder.

Multer exposes the uploaded file through:

``` js
req.file
```

and the actual binary data through:

``` js
req.file.buffer
```

Conceptually:

``` text
req.file
|
+-- fieldname
+-- originalname
+-- mimetype
+-- size
+-- buffer
       |
       +-- actual image bytes
```

------------------------------------------------------------------------

# 15. Step 5 --- Sending the Buffer to ImageKit

The route calls:

``` js
const result = await uploadFile(req.file.buffer);
```

The storage service receives the Buffer.

It then performs:

``` js
buffer.toString("base64")
```

and sends the resulting Base64 representation to ImageKit:

``` js
imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg"
});
```

So the chain is:

``` text
Image file
    |
    v
Multer Buffer
    |
    v
Base64 string
    |
    v
ImageKit upload API
```

------------------------------------------------------------------------

# 16. Step 6 --- ImageKit Returns the URL

After a successful upload, ImageKit returns information about the
uploaded file.

The backend uses:

``` js
result.url
```

For example:

``` text
https://ik.imagekit.io/.../image.jpg
```

That URL is now the reference to the cloud-hosted image.

------------------------------------------------------------------------

# 17. Step 7 --- MongoDB Stores the URL

The backend creates the post using:

``` js
const post = await postModel.create({
    image: result.url,
    caption: req.body.caption
});
```

Therefore MongoDB receives:

``` text
image   -> ImageKit URL
caption -> caption text
```

It does not receive the image bytes.

This is the critical separation:

``` text
ImageKit
    -> actual image

MongoDB
    -> URL + caption
```

------------------------------------------------------------------------

# 18. Complete POST /create-post Flow

``` text
USER
 |
 | image + caption
 v
REACT CreatePost.jsx
 |
 | FormData
 v
AXIOS
 |
 | POST /create-post
 v
EXPRESS
 |
 v
MULTER
 |
 | req.file.buffer
 v
STORAGE SERVICE
 |
 | Buffer -> Base64
 v
IMAGEKIT
 |
 | result.url
 v
EXPRESS
 |
 | image URL + caption
 v
MONGOOSE
 |
 v
MONGODB
 |
 | post document created
 v
HTTP 201 response
 |
 v
REACT
 |
 | navigate("/feed")
 v
/feed
```

------------------------------------------------------------------------

# 19. Frontend Routing

The frontend uses React Router.

`App.jsx` defines:

``` text
/create-post -> CreatePost
/feed        -> Feed
```

So:

``` text
/create-post
      |
      v
CreatePost.jsx
```

and:

``` text
/feed
   |
   v
Feed.jsx
```

After successful post creation, the frontend calls:

``` js
navigate("/feed");
```

------------------------------------------------------------------------

# 20. How Frontend and Backend Are Integrated

The frontend and backend are not directly importing each other's code.

They are integrated through HTTP APIs.

The frontend calls:

``` js
axios.post("http://localhost:3000/create-post", formData);
```

and:

``` js
axios.get("http://localhost:3000/posts");
```

Therefore:

``` text
React
  |
  | HTTP
  v
Express
```

This is the main integration point.

------------------------------------------------------------------------

# 21. Why CORS Is Required

The frontend and backend run on different origins:

``` text
Frontend -> localhost:5173
Backend  -> localhost:3000
```

The browser treats those as different origins.

The backend therefore uses:

``` js
const cors = require("cors");

app.use(cors());
```

This allows the browser-based React application to communicate with the
Express API.

Without CORS, the backend may process a request successfully while the
browser refuses to expose the response to frontend JavaScript.

This explains why a browser can sometimes show a CORS/network error even
though the server returned a successful HTTP response.

------------------------------------------------------------------------

# 22. Feed Loading Flow

`Feed.jsx` uses `useEffect()`:

``` js
useEffect(() => {
    axios.get("http://localhost:3000/posts")
        .then((res) => {
            setPosts(res.data.posts);
        });
}, []);
```

The empty dependency array means the request is made when the Feed
component mounts.

The flow is:

``` text
Feed component mounts
        |
        v
useEffect()
        |
        v
Axios GET /posts
        |
        v
Express
        |
        v
Mongoose
        |
        v
MongoDB
        |
        v
Posts returned
        |
        v
Express JSON response
        |
        v
Axios
        |
        v
setPosts(...)
        |
        v
React re-renders
```

------------------------------------------------------------------------

# 23. GET /posts Backend Flow

The backend route is:

``` js
app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    return res.status(200).json({
        message: "Posts Fetched Successfully!",
        posts
    });
});
```

The important operation is:

``` js
postModel.find()
```

Mongoose asks MongoDB for the stored post documents.

The backend then sends them back as JSON.

------------------------------------------------------------------------

# 24. How the Feed Displays the Image

React receives:

``` json
{
    "message": "Posts Fetched Successfully!",
    "posts": [
        {
            "_id": "...",
            "image": "https://ik.imagekit.io/...",
            "caption": "Beautiful Idea"
        }
    ]
}
```

The frontend stores the posts:

``` js
setPosts(res.data.posts);
```

Then:

``` js
posts.map((post) => (
    <div key={post._id} className="post-card">
        <img src={post.image} alt={post.caption} />
        <p>{post.caption}</p>
    </div>
))
```

The important line is:

``` jsx
<img src={post.image} />
```

`post.image` is the ImageKit URL that originally came from the upload
operation.

The browser then requests that URL from ImageKit.

------------------------------------------------------------------------

# 25. Complete Image Journey --- End to End

``` text
                 UPLOAD SIDE

User's Computer
      |
      | selects image
      v
React File Input
      |
      | FormData
      v
Axios
      |
      | POST /create-post
      v
Express
      |
      v
Multer
      |
      | req.file.buffer
      v
Node.js Buffer
      |
      | Base64
      v
ImageKit
      |
      | returns URL
      v
MongoDB
      |
      | stores URL + caption
      v
Database


                 DISPLAY SIDE

React Feed
      |
      | GET /posts
      v
Express
      |
      v
MongoDB
      |
      | URL + caption
      v
Express
      |
      | JSON
      v
Axios
      |
      v
React State
      |
      | posts.map()
      v
<img src={post.image}>
      |
      | requests ImageKit URL
      v
ImageKit
      |
      v
Actual Image Displayed
```

### The one-sentence mental model

**The image file goes to ImageKit, only its URL goes into MongoDB, that
URL comes back through the backend to React, and the browser uses the
URL to fetch the actual image from ImageKit.**

------------------------------------------------------------------------

# 26. Responsibility of Each Technology

  Technology       Responsibility
  ---------------- --------------------------------------
  React            User interface and state
  Vite             Frontend development/build tooling
  React Router     Frontend navigation
  Axios            HTTP communication
  Express          Backend server and API routes
  Multer           Receives multipart file uploads
  Node.js Buffer   Holds uploaded image bytes in memory
  ImageKit         Cloud image storage/delivery
  Mongoose         Node.js interface to MongoDB
  MongoDB Atlas    Stores post metadata and image URLs
  CORS             Allows cross-origin browser requests
  dotenv           Loads environment variables

------------------------------------------------------------------------

# 27. Why React Does Not Connect Directly to MongoDB

Do not think of the application as:

``` text
React -> MongoDB
```

Instead:

``` text
React
  |
  v
Express API
  |
  v
Mongoose
  |
  v
MongoDB
```

The backend is responsible for:

-   receiving requests
-   validating data
-   processing files
-   applying business logic
-   communicating with cloud services
-   communicating with the database
-   deciding what data is returned

This keeps database credentials and server-side secrets away from the
browser.

------------------------------------------------------------------------

# 28. Why the ImageKit Private Key Is on the Backend

The ImageKit private key is read with:

``` js
process.env.PRIVATE_IMAGEKIT
```

and is used by the server-side ImageKit SDK.

The frontend does not receive the private key.

The architecture is:

``` text
React
   |
   | image
   v
Backend
   |
   | private ImageKit credentials
   v
ImageKit
   |
   | public URL
   v
Backend -> MongoDB
```

Only the resulting image URL is exposed to the frontend.

------------------------------------------------------------------------

# 29. API Endpoints

## POST `/create-post`

Creates a new post.

### Request

Multipart form data:

``` text
image   -> image file
caption -> caption text
```

### Processing

``` text
Multer
  -> Buffer
  -> ImageKit
  -> Image URL
  -> MongoDB
```

### Response

``` json
{
    "message": "Post Created Successfully!",
    "post": {
        "_id": "...",
        "image": "...",
        "caption": "..."
    }
}
```

------------------------------------------------------------------------

## GET `/posts`

Fetches all posts.

### Processing

``` text
MongoDB
   |
   v
Mongoose
   |
   v
Express
   |
   v
JSON response
```

### Response

``` json
{
    "message": "Posts Fetched Successfully!",
    "posts": [
        {
            "_id": "...",
            "image": "...",
            "caption": "..."
        }
    ]
}
```

------------------------------------------------------------------------

# 30. Frontend Page Flow

``` text
                    React Router
                         |
              +----------+----------+
              |                     |
              v                     v
        /create-post              /feed
              |                     |
              v                     v
        CreatePost.jsx          Feed.jsx
              |                     |
              | POST                | GET
              v                     v
        Backend API            Backend API
```

Create Post:

``` text
User -> Form -> FormData -> Axios -> Backend
```

Feed:

``` text
Backend -> Axios -> React State -> JSX -> ImageKit
```

------------------------------------------------------------------------

# 31. Styling

The project currently uses `src/index.css` for the global application
styling.

The feed uses selectors such as:

``` text
.feed-section
.post-card
.post-card img
.post-card p
```

The UI follows a dark social-media-feed style.

------------------------------------------------------------------------

# 32. Current Project Limitations

This is a learning project, so several things should eventually be
improved.

### 1. Backend error handling

The asynchronous route handlers currently do not use proper `try/catch`
blocks.

ImageKit, MongoDB, or file-upload failures should eventually return
controlled error responses.

### 2. Image validation

The backend should validate:

-   whether a file exists
-   file type
-   file size

Do not rely only on:

``` jsx
accept="image/*"
```

because frontend validation can be bypassed.

### 3. Hard-coded backend URL

The frontend currently uses:

``` text
http://localhost:3000
```

This should eventually move into a frontend environment variable.

### 4. Broad CORS configuration

The backend currently uses:

``` js
app.use(cors());
```

For production, the allowed frontend origin should be restricted.

### 5. Duplicate submissions

The Create Post page does not currently disable the Submit button while
the request is running.

A loading state would prevent accidental repeated POST requests.

### 6. Feed error handling

The Feed request currently has no `.catch()` branch.

The UI should show a useful error state if the backend is unavailable.

### 7. Image filename

The storage service currently sends:

``` text
fileName: "image.jpg"
```

for uploads.

A production implementation should use a unique naming strategy.

### 8. Backend startup ordering

The current server starts listening independently of the awaited
database connection.

A stronger production pattern is to connect to MongoDB first and start
accepting requests only after the database connection succeeds.

------------------------------------------------------------------------

# 33. Recommended Future Backend Structure

As the project grows, the backend can be separated further:

``` text
backend/
|
+-- server.js
|
+-- src/
    |
    +-- app.js
    |
    +-- routes/
    |   +-- post.routes.js
    |
    +-- controllers/
    |   +-- post.controller.js
    |
    +-- services/
    |   +-- storage.service.js
    |
    +-- models/
    |   +-- post.model.js
    |
    +-- middleware/
    |   +-- upload.middleware.js
    |
    +-- db/
        +-- db.js
```

Currently, the route and controller logic are simple enough to remain
inside `app.js`.

------------------------------------------------------------------------

# 34. Final Mental Model

If you remember only one diagram from this project, remember this:

``` text
                         CREATE POST

User
 |
 | image + caption
 v
React
 |
 | FormData
 v
Axios
 |
 | POST /create-post
 v
Express
 |
 v
Multer
 |
 | Buffer
 v
ImageKit
 |
 | URL
 v
MongoDB
 |
 | URL + caption
 v
Database
```

Then:

``` text
                         FEED

React
 |
 | GET /posts
 v
Express
 |
 v
MongoDB
 |
 | URL + caption
 v
Express
 |
 | JSON
 v
Axios
 |
 v
React State
 |
 | posts.map()
 v
<img src={post.image}>
 |
 v
ImageKit
 |
 v
Actual Image
```

## Core principle

``` text
IMAGE FILE
    |
    v
IMAGEKIT
    |
    v
IMAGE URL
    |
    v
MONGODB
    |
    v
BACKEND API
    |
    v
REACT
    |
    v
BROWSER
    |
    v
IMAGEKIT
    |
    v
IMAGE
```

**MongoDB stores the reference. ImageKit stores/serves the asset.
Express connects everything. React is the client that starts the
requests and renders the results.**
