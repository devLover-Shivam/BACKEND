# Mini Project 1 - Task Manager

## Problem Statement

Build a simple **Task Manager REST API** using **Node.js and Express.js**.

The purpose of this project is to create a backend system that allows a client to manage tasks through HTTP requests. The application should provide APIs for creating, retrieving, updating, and deleting tasks.

Each task should contain basic information such as:

```json
{
    "title": "Learn Express",
    "description": "Build a REST API",
    "completed": false
}
```

The API should support the following operations:

* **Create a task** using `POST`.
* **Retrieve all tasks** using `GET`.
* **Update a task's completion status** using `PATCH`.
* **Delete a task** using `DELETE`.

For this initial project, tasks are stored temporarily in an in-memory JavaScript array rather than a database.

The API should be testable using **Postman** without requiring a frontend application.
