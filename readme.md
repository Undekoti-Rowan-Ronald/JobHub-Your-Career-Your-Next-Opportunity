# Job Listings — Spring Boot + MongoDB + React

A beginner-friendly full-stack Job Listings application built using **Spring Boot**, **MongoDB**, and **React**.

This README is also intended to be a **revision/reference guide**. It explains what each part of the project does, the important Spring packages, annotations, API endpoints, MongoDB connection, React connection, and the basic flow of data.

---

# 1. Project Overview

The application allows users to:

- View job listings
- Search for jobs
- View details of a job
- Add a new job listing
- Apply for a job
- Store job applications in MongoDB

The project has two main applications:

```text
                    JOB LISTINGS APPLICATION
                              |
             +----------------+----------------+
             |                                 |
             v                                 v
       Spring Boot Backend              React Frontend
             |                                 |
             |                                 |
             +----------------+----------------+
                              |
                              v
                          MongoDB
```

### Simple explanation

- **React** = what the user sees and interacts with.
- **Spring Boot** = the backend that receives requests and performs operations.
- **MongoDB** = where job listings and applications are stored.
- **REST API** = the communication path between React and Spring Boot.

---

# 2. Technology Stack

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data MongoDB
- MongoDB
- Maven
- Lombok

## Frontend

- React
- Vite
- JavaScript
- React Router
- HTML
- CSS

## Development Tools

- Visual Studio Code
- IntelliJ IDEA (if used for Java development)
- Git
- GitHub
- MongoDB Atlas / MongoDB

---

# 3. Project Structure

The overall project can look like this:

```text
Job_Listings/
│
├── JobListings/                    # Spring Boot backend
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/rowan/JobListings/
│   │   │   │       │
│   │   │   │       ├── Controllor/
│   │   │   │       │   ├── PostController.java
│   │   │   │       │   └── Apply_controllor.java
│   │   │   │       │
│   │   │   │       ├── Model/
│   │   │   │       │   ├── Post.java
│   │   │   │       │   └── Applyjob.java
│   │   │   │       │
│   │   │   │       ├── Repository/
│   │   │   │       │   ├── MongoRepo.java
│   │   │   │       │   ├── Mango_apply_repo.java
│   │   │   │       │   ├── SearchRepo.java
│   │   │   │       │   └── SearchImp.java
│   │   │   │       │
│   │   │   │       └── JobListingsApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
└── job-listings-frontend/          # React frontend
    │
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── JobCard.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── AddJob.jsx
    │   │   ├── JobDetails.jsx
    │   │   └── ApplyJob.jsx
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    └── package.json
```

---

# 4. Backend Architecture

The Spring Boot backend follows a simple layered structure:

```text
                Client / React
                      |
                      | HTTP Request
                      v
               +-------------+
               | Controller  |
               +-------------+
                      |
                      v
               +-------------+
               | Repository  |
               +-------------+
                      |
                      v
               +-------------+
               |  MongoDB    |
               +-------------+
```

In this project:

```text
React
  |
  | GET /myposts
  | POST /send_post
  | GET /getpost/{id}
  | GET /search/{words}
  | POST /apply
  |
  v
PostController / Apply_controllor
  |
  v
MongoRepo / Mango_apply_repo
  |
  v
MongoDB
```

---

# 5. Spring Boot Main Class

File:

```text
JobListingsApplication.java
```

Example:

```java
package com.rowan.JobListings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobListingsApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobListingsApplication.class, args);
    }
}
```

## `@SpringBootApplication`

This is one of the most important Spring Boot annotations.

It tells Spring Boot:

> "This is the main class of my Spring Boot application. Start the application and configure the required Spring components."

It also enables component scanning.

That means Spring searches packages below:

```text
com.rowan.JobListings
```

for things such as:

- Controllers
- Repositories
- Components
- Services

### Remember

```text
@SpringBootApplication
        |
        +--> Starts Spring Boot
        |
        +--> Finds Spring components
        |
        +--> Applies automatic configuration
```

---

# 6. Spring Web Package

The main package used for REST APIs is:

```java
org.springframework.web.bind.annotation
```

Important annotations from this package:

- `@RestController`
- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`
- `@RequestBody`
- `@PathVariable`
- `@RequestParam`
- `@CrossOrigin`

---

# 7. `@RestController`

Example:

```java
@RestController
public class PostController {
}
```

`@RestController` tells Spring:

> "This class contains REST API endpoints."

For example:

```java
@GetMapping("/myposts")
public List<Post> getallPosts() {
    return repo.findAll();
}
```

Spring makes `/myposts` available as an HTTP API.

---

# 8. `@GetMapping`

Used when the client wants to **get/read data**.

Example:

```java
@GetMapping("/myposts")
public List<Post> getallPosts() {
    return repo.findAll();
}
```

Request:

```text
GET /myposts
```

Meaning:

> Give me all job posts.

Another example:

```java
@GetMapping("/getpost/{id}")
public Post getonepost(@PathVariable String id) {
    return repo.findById(id).orElse(null);
}
```

---

# 9. `@PostMapping`

Used when the client wants to **send/create data**.

Example:

```java
@PostMapping("/send_post")
public Post addPost(@RequestBody Post post) {
    return repo.save(post);
}
```

Request:

```text
POST /send_post
```

The React frontend sends JSON to Spring Boot.

---

# 10. `@RequestBody`

`@RequestBody` converts JSON received from the frontend into a Java object.

For example, React sends:

```json
{
  "profile": "Java Developer",
  "description": "Java backend developer",
  "tech": [
    "Java",
    "Spring Boot",
    "MongoDB"
  ]
}
```

Spring converts it into:

```java
Post post
```

So:

```java
@PostMapping("/send_post")
public Post addPost(@RequestBody Post post) {
    return repo.save(post);
}
```

Flow:

```text
JSON
 |
 v
@RequestBody
 |
 v
Java Object
 |
 v
MongoDB
```

---

# 11. `@PathVariable`

Used when a value is part of the URL.

Example:

```java
@GetMapping("/getpost/{id}")
public Post getonepost(@PathVariable String id) {
    return repo.findById(id).orElse(null);
}
```

If the request is:

```text
GET /getpost/123
```

then:

```text
id = 123
```

Another example:

```java
@GetMapping("/search/{words}")
public List<Post> search(@PathVariable String words) {
    return serrep.findbyTest(words);
}
```

Request:

```text
GET /search/Java
```

Then:

```text
words = Java
```

---

# 12. `@RequestParam`

`@RequestParam` is used when data comes after `?` in the URL.

Example:

```text
/search?keyword=Java
```

Controller:

```java
@GetMapping("/search")
public List<Post> search(
        @RequestParam String keyword) {
    ...
}
```

Difference:

```text
@PathVariable
/search/Java

@RequestParam
/search?keyword=Java
```

---

# 13. `@CrossOrigin`

React and Spring Boot run on different ports during development.

Example:

```text
React       -> localhost:5173
Spring Boot -> localhost:8080
```

The browser considers these different origins.

You can allow React using:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Example:

```java
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {
}
```

This allows your React frontend to communicate with Spring Boot.

---

# 14. Model Package

Your model classes represent the data stored in MongoDB.

Current models:

```text
Model
│
├── Post
│
└── Applyjob
```

---

# 15. `Post` Model

Example:

```java
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "JobPost")
@Data
public class Post {

    private String profile;

    private String description;

    private List<String> tech;
}
```

The fields represent a job listing.

Example document:

```json
{
  "profile": "Java Developer",
  "description": "Develop backend applications.",
  "tech": [
    "Java",
    "Spring Boot",
    "MongoDB"
  ]
}
```

---

# 16. `@Document`

Package:

```java
org.springframework.data.mongodb.core.mapping.Document
```

Example:

```java
@Document(collection = "JobPost")
```

It tells Spring Data MongoDB:

> "Store this Java class as a MongoDB document."

The collection name is:

```text
JobPost
```

So:

```text
Post.java
   |
   v
@Document(collection = "JobPost")
   |
   v
MongoDB
   |
   v
JobPost collection
```

---

# 17. `Applyjob` Model

The application model contains:

```java
private String name;
private String email;
private String phone_no;
private String current_company;
private double current_CTC;
private double expected_CTC;
private String notice_period;
```

Example:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone_no": "9876543210",
  "current_company": "ABC Technologies",
  "current_CTC": 5.5,
  "expected_CTC": 8.0,
  "notice_period": "3"
}
```

It is stored in:

```java
@Document(collection = "apply")
```

Therefore:

```text
Applyjob.java
     |
     v
apply collection
```

---

# 18. Lombok

Your project uses Lombok.

Important annotations:

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
```

## `@Data`

```java
@Data
```

Automatically generates common methods such as:

- Getters
- Setters
- `toString()`
- `equals()`
- `hashCode()`

Without Lombok, you would have to write these manually.

---

# 19. `@NoArgsConstructor`

```java
@NoArgsConstructor
```

Creates a constructor with no arguments.

Equivalent to:

```java
public Post() {
}
```

Spring and MongoDB can use a no-argument constructor when creating objects.

---

# 20. `@AllArgsConstructor`

```java
@AllArgsConstructor
```

Creates a constructor containing all fields.

For example:

```java
new Post(
    "Java Developer",
    "Java backend developer",
    List.of("Java", "Spring Boot")
);
```

---

# 21. Repository Package

Repositories are responsible for communicating with the database.

Current structure:

```text
Repository
│
├── MongoRepo
│
├── Mango_apply_repo
│
├── SearchRepo
│
└── SearchImp
```

---

# 22. `MongoRepository`

Package:

```java
org.springframework.data.mongodb.repository.MongoRepository
```

Example:

```java
public interface MongoRepo
        extends MongoRepository<Post, String> {
}
```

This gives you many database operations automatically.

For example:

```java
repo.findAll();
repo.findById(id);
repo.save(post);
repo.deleteById(id);
```

You don't need to manually write MongoDB code for basic CRUD operations.

---

# 23. Why Each Model Usually Gets Its Own Repository

You have:

```text
Post
 |
 +--> MongoRepo
```

and:

```text
Applyjob
 |
 +--> Mango_apply_repo
```

Because:

```java
MongoRepository<Post, String>
```

is for `Post`.

While:

```java
MongoRepository<Applyjob, String>
```

is for `Applyjob`.

Think:

```text
Post
  |
  v
MongoRepo
  |
  v
JobPost collection


Applyjob
  |
  v
Mango_apply_repo
  |
  v
apply collection
```

---

# 24. Repository for Applications

Your application repository should look like:

```java
package com.rowan.JobListings.Repository;

import com.rowan.JobListings.Model.Applyjob;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Mango_apply_repo
        extends MongoRepository<Applyjob, String> {
}
```

Notice:

```java
MongoRepository<Applyjob, String>
```

The first type is the model.

The second type is the ID type.

---

# 25. Controller Package

Controllers receive requests from the frontend.

You currently have:

```text
Controllor
│
├── PostController
│
└── Apply_controllor
```

---

# 26. Job Controller

Your controller handles job operations.

Example:

```java
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    MongoRepo repo;

    @GetMapping("/myposts")
    public List<Post> getallPosts() {
        return repo.findAll();
    }

    @PostMapping("/send_post")
    public Post addPost(@RequestBody Post post) {
        return repo.save(post);
    }
}
```

---

# 27. Application Controller

Your application controller handles applications.

Example:

```java
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Apply_controllor {

    @Autowired
    Mango_apply_repo mangoApplyRepo;

    @PostMapping("/apply")
    public Applyjob Apply(@RequestBody Applyjob applyjob) {
        return mangoApplyRepo.save(applyjob);
    }
}
```

Flow:

```text
React Application Form
          |
          | POST /apply
          v
Apply_controllor
          |
          | applyjob
          v
Mango_apply_repo
          |
          | save()
          v
MongoDB
```

---

# 28. `@Autowired`

Package:

```java
org.springframework.beans.factory.annotation.Autowired
```

Example:

```java
@Autowired
MongoRepo repo;
```

It tells Spring:

> "Give this class the required object automatically."

Without it, you would have to manually create the repository object.

Simple idea:

```text
Spring
  |
  | creates repository
  v
MongoRepo
  |
  | gives it to
  v
PostController
```

---

# 29. Dependency Injection

`@Autowired` is an example of **Dependency Injection**.

Don't worry about the complicated name.

It simply means:

> Your class needs another class, and Spring provides it.

Example:

```java
@Autowired
MongoRepo repo;
```

The controller needs `MongoRepo`.

Spring provides it.

---

# 30. API Endpoints

Your backend currently has these main APIs.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/myposts` | Get all jobs |
| POST | `/send_post` | Add a job |
| GET | `/getpost/{id}` | Get one job |
| GET | `/search/{words}` | Search jobs |
| POST | `/apply` | Submit job application |

---

# 31. GET All Jobs

Request:

```http
GET http://localhost:8080/myposts
```

Controller:

```java
@GetMapping("/myposts")
public List<Post> getallPosts() {
    return repo.findAll();
}
```

Flow:

```text
React
  |
  | GET /myposts
  v
PostController
  |
  | repo.findAll()
  v
MongoDB
  |
  | JobPost documents
  v
React
```

---

# 32. Add a Job

Request:

```http
POST http://localhost:8080/send_post
```

JSON:

```json
{
  "profile": "Java Developer",
  "description": "Backend developer",
  "tech": [
    "Java",
    "Spring Boot",
    "MongoDB"
  ]
}
```

Controller:

```java
@PostMapping("/send_post")
public Post addPost(@RequestBody Post post) {
    return repo.save(post);
}
```

---

# 33. Get One Job

Request:

```http
GET /getpost/{id}
```

Example:

```text
GET /getpost/123
```

Controller:

```java
@GetMapping("/getpost/{id}")
public Post getonepost(@PathVariable String id) {
    return repo.findById(id).orElse(null);
}
```

---

# 34. Search Jobs

Request:

```text
GET /search/Java
```

Controller:

```java
@GetMapping("/search/{words}")
public List<Post> search(@PathVariable String words) {
    return serrep.findbyTest(words);
}
```

Your custom search repository is responsible for the search logic.

---

# 35. Apply for a Job

Request:

```http
POST /apply
```

Example JSON:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone_no": "9876543210",
  "current_company": "ABC",
  "current_CTC": 5.5,
  "expected_CTC": 8.0,
  "notice_period": "3"
}
```

Flow:

```text
User
 |
 | fills application form
 v
React
 |
 | POST /apply
 v
Spring Boot
 |
 | @RequestBody
 v
Applyjob object
 |
 | save()
 v
Mango_apply_repo
 |
 v
MongoDB
 |
 v
apply collection
```

---

# 36. MongoDB

MongoDB is a NoSQL database.

Instead of tables and rows, MongoDB mainly uses:

```text
Database
   |
   +-- Collection
          |
          +-- Document
```

For this project:

```text
MongoDB Database
       |
       +-- JobPost
       |     |
       |     +-- Job document
       |     +-- Job document
       |
       +-- apply
             |
             +-- Application document
             +-- Application document
```

---

# 37. MongoDB Document Example

Job:

```json
{
  "profile": "Java Developer",
  "description": "Backend development",
  "tech": [
    "Java",
    "Spring Boot"
  ]
}
```

Application:

```json
{
  "name": "Rowan",
  "email": "rowan@gmail.com",
  "phone_no": "9876543210",
  "current_company": "ABC",
  "current_CTC": 5.5,
  "expected_CTC": 8.0,
  "notice_period": "3"
}
```

---

# 38. `application.properties`

Your Spring Boot configuration is kept here:

```text
src/main/resources/application.properties
```

This file normally contains:

```properties
spring.application.name=JobListings

spring.data.mongodb.uri=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
```

Do **not** upload real database passwords to GitHub.

Better:

```properties
spring.data.mongodb.uri=${MONGODB_URI}
```

Then keep the real value in an environment variable.

---

# 39. React Frontend

The frontend uses React and Vite.

Main flow:

```text
main.jsx
    |
    v
App.jsx
    |
    +----------------+
    |                |
    v                v
Navbar            Routes
                     |
          +----------+----------+
          |          |          |
          v          v          v
        Home      AddJob    JobDetails
                               |
                               v
                           ApplyJob
```

---

# 40. React Components

## `Navbar.jsx`

Responsible for navigation.

```text
Navbar
 |
 +-- Home
 |
 +-- Add Job
```

---

## `JobCard.jsx`

Displays one job.

Example:

```text
+---------------------------+
| Java Developer            |
|                           |
| Backend developer...      |
|                           |
| Java  Spring Boot MongoDB |
|                           |
|       [View Job]          |
+---------------------------+
```

---

## `Home.jsx`

Responsible for:

- Getting jobs
- Displaying jobs
- Searching jobs
- Refreshing jobs

It calls:

```text
GET /myposts
```

and:

```text
GET /search/{words}
```

---

## `AddJob.jsx`

Displays the form to create a job.

It calls:

```text
POST /send_post
```

---

## `JobDetails.jsx`

Displays the selected job.

It contains:

```text
Job profile
Description
Technologies
Apply Now
```

---

## `ApplyJob.jsx`

Displays the application form.

Fields:

```text
Name
Email
Phone Number
Current Company
Current CTC
Expected CTC
Notice Period
```

It calls:

```text
POST /apply
```

---

# 41. React Router

The project uses:

```text
react-router-dom
```

Routes:

```text
/               → Home
/add-job        → AddJob
/job            → JobDetails
/apply          → ApplyJob
```

Example:

```jsx
<Route
    path="/apply"
    element={<ApplyJob />}
/>
```

---

# 42. Frontend to Backend Communication

React uses `fetch()` to communicate with Spring Boot.

Example:

```javascript
const response = await fetch(
    "http://localhost:8080/myposts"
);
```

For POST:

```javascript
const response = await fetch(
    "http://localhost:8080/apply",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(application)
    }
);
```

Flow:

```text
React Object
     |
     | JSON.stringify()
     v
JSON
     |
     | HTTP
     v
Spring Boot
     |
     | @RequestBody
     v
Java Object
```

---

# 43. Complete Application Flow

## Viewing Jobs

```text
User
 |
 v
React Home
 |
 | GET /myposts
 v
PostController
 |
 v
MongoRepo
 |
 v
MongoDB
 |
 | Job documents
 v
React
 |
 v
Job Cards
```

## Creating a Job

```text
User
 |
 | fills form
 v
AddJob.jsx
 |
 | POST /send_post
 v
PostController
 |
 | @RequestBody Post
 v
MongoRepo
 |
 | save()
 v
MongoDB
```

## Applying for a Job

```text
User
 |
 v
JobDetails
 |
 | Apply Now
 v
ApplyJob.jsx
 |
 | POST /apply
 v
Apply_controllor
 |
 | @RequestBody Applyjob
 v
Mango_apply_repo
 |
 | save()
 v
MongoDB
 |
 v
apply collection
```

---

# 44. Important Spring Packages Used

## Spring Boot

```java
org.springframework.boot
```

Used to start the Spring Boot application.

Main class:

```java
@SpringBootApplication
```

---

## Spring Web

```java
org.springframework.web.bind.annotation
```

Used for REST APIs.

Important annotations:

```java
@RestController
@GetMapping
@PostMapping
@PutMapping
@DeleteMapping
@RequestBody
@PathVariable
@RequestParam
@CrossOrigin
```

---

## Spring Dependency Injection

```java
org.springframework.beans.factory.annotation
```

Important annotation:

```java
@Autowired
```

Used to get Spring-managed objects.

---

## Spring Data MongoDB

```java
org.springframework.data.mongodb.repository
```

Important interface:

```java
MongoRepository
```

MongoDB document annotation:

```java
org.springframework.data.mongodb.core.mapping.Document
```

---

## Lombok

Important annotations:

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
```

Used to reduce Java boilerplate code.

---

# 45. Annotation Quick Revision

| Annotation | Simple meaning |
|---|---|
| `@SpringBootApplication` | Main Spring Boot application |
| `@RestController` | Class contains REST APIs |
| `@GetMapping` | Handle GET request |
| `@PostMapping` | Handle POST request |
| `@PutMapping` | Handle PUT request |
| `@DeleteMapping` | Handle DELETE request |
| `@RequestBody` | Convert JSON into Java object |
| `@PathVariable` | Get value from URL |
| `@RequestParam` | Get value from query parameter |
| `@CrossOrigin` | Allow frontend from another origin |
| `@Autowired` | Let Spring provide an object |
| `@Document` | Make a class a MongoDB document |
| `@Data` | Generate getters/setters/etc. |
| `@NoArgsConstructor` | Generate empty constructor |
| `@AllArgsConstructor` | Generate constructor with all fields |

---

# 46. CRUD

CRUD means:

```text
C = Create
R = Read
U = Update
D = Delete
```

In this project:

```text
CREATE
POST /send_post

READ
GET /myposts
GET /getpost/{id}

UPDATE
Can be added later

DELETE
Can be added later
```

For applications:

```text
CREATE
POST /apply
```

Later, you can add:

```text
GET    /applications
GET    /applications/{id}
PUT    /applications/{id}
DELETE /applications/{id}
```

---

# 47. HTTP Methods

## GET

Used to get data.

```text
GET /myposts
```

## POST

Used to create/send data.

```text
POST /send_post
POST /apply
```

## PUT

Normally used to update data.

Example:

```text
PUT /update/123
```

## DELETE

Used to delete data.

Example:

```text
DELETE /delete/123
```

---

# 48. HTTP Status Codes

Useful codes to remember:

```text
200 OK
```

Request worked.

```text
201 Created
```

New resource was created.

```text
400 Bad Request
```

Something was wrong with the request.

```text
404 Not Found
```

Requested resource was not found.

```text
500 Internal Server Error
```

Something went wrong on the backend.

---

# 49. Dependency Injection — Simple Example

Without Spring:

```java
MongoRepo repo = new MongoRepo();
```

With Spring:

```java
@Autowired
MongoRepo repo;
```

Spring creates and manages the repository for you.

This is one of the major ideas behind Spring Boot.

---

# 50. Why We Use Interfaces for Repositories

Example:

```java
public interface MongoRepo
        extends MongoRepository<Post, String> {
}
```

You don't need to manually implement:

```text
findAll()
findById()
save()
deleteById()
```

Spring Data provides these operations.

This is one of the reasons Spring Data is useful.

---

# 51. Common Mistakes to Remember

## Mistake 1 — Wrong repository model

Wrong:

```java
MongoRepository<Apply_controllor, String>
```

Correct:

```java
MongoRepository<Applyjob, String>
```

A repository should work with the **model/entity**, not the controller.

---

## Mistake 2 — Autowiring a model

Wrong:

```java
@Autowired
Applyjob applyjob;
```

Models are not normally injected like repositories.

Correct:

```java
@Autowired
Mango_apply_repo mangoApplyRepo;
```

---

## Mistake 3 — Forgetting `@RequestBody`

Without:

```java
@RequestBody
```

Spring may not correctly convert incoming JSON into your Java object.

---

## Mistake 4 — CORS

If React says something like:

```text
Blocked by CORS policy
```

check:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

---

## Mistake 5 — Backend not running

If React shows:

```text
Failed to fetch
```

check that Spring Boot is running:

```text
http://localhost:8080
```

---

# 52. How to Test the Backend

You can use:

- Browser for GET requests
- Postman
- Insomnia
- Swagger UI

For example:

```text
GET http://localhost:8080/myposts
```

For POST requests, use Postman or Swagger.

---

# 53. Example Postman Request

### Add Job

```text
POST
http://localhost:8080/send_post
```

Body → raw → JSON:

```json
{
  "profile": "Java Developer",
  "description": "Develop backend applications using Java.",
  "tech": [
    "Java",
    "Spring Boot",
    "MongoDB"
  ]
}
```

### Apply

```text
POST
http://localhost:8080/apply
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phone_no": "9876543210",
  "current_company": "ABC Technologies",
  "current_CTC": 5.5,
  "expected_CTC": 8.0,
  "notice_period": "3"
}
```

---

# 54. Maven

The backend uses Maven.

Important file:

```text
pom.xml
```

Maven manages:

- Dependencies
- Build
- Tests
- Packaging
- Running the project

Typical command:

```bash
mvn spring-boot:run
```

or using the Maven wrapper:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

---

# 55. Important Maven Dependencies

Typical dependencies used by this project include:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

This provides Spring MVC and REST API support.

MongoDB:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

Lombok:

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

---

# 56. Git Structure

The repository contains both backend and frontend:

```text
GitHub Repository
│
├── JobListings
│   └── Spring Boot backend
│
└── job-listings-frontend
    └── React frontend
```

Important files that should normally NOT be committed:

```text
target/
node_modules/
dist/
.idea/
.env
```

A `.gitignore` file should contain rules for these.

---

# 57. Environment Variables and Secrets

Never commit:

```text
MongoDB password
API keys
JWT secrets
Private credentials
```

For example, avoid putting a real password directly into GitHub:

```properties
spring.data.mongodb.uri=mongodb+srv://user:REAL_PASSWORD@...
```

Use an environment variable instead:

```properties
spring.data.mongodb.uri=${MONGODB_URI}
```

---

# 58. Full Backend Request Flow

When a user submits an application:

```text
                 USER
                   |
                   v
          React Application Form
                   |
                   | JSON
                   v
        POST http://localhost:8080/apply
                   |
                   v
          Apply_controllor
                   |
                   | @RequestBody
                   v
              Applyjob
                   |
                   v
          Mango_apply_repo
                   |
                   | save()
                   v
               MongoDB
                   |
                   v
          "apply" collection
```

---

# 59. Full Job Listing Flow

```text
                 USER
                   |
                   v
              React Home
                   |
                   | GET /myposts
                   v
            PostController
                   |
                   v
               MongoRepo
                   |
                   v
               MongoDB
                   |
                   | Job documents
                   v
              React Home
                   |
                   v
               Job Cards
```

---

# 60. What You Have Learned From This Project

By building this project, you are practicing:

### Java

- Classes
- Objects
- Interfaces
- Generics
- Lists
- Constructors
- Annotations

### Spring Boot

- REST APIs
- Controllers
- Dependency Injection
- Request handling
- Spring Data
- MongoDB integration

### MongoDB

- Databases
- Collections
- Documents
- CRUD operations
- MongoRepository

### React

- Components
- Props
- State
- Forms
- `useState`
- `useEffect`
- React Router
- API calls with `fetch()`

### Full Stack

```text
Frontend
   |
   | HTTP
   v
Backend
   |
   | Database operations
   v
Database
```

---

# 61. Quick Revision Sheet

If you forget everything, remember this:

```text
MODEL
"What does my data look like?"

        ↓

REPOSITORY
"How do I talk to MongoDB?"

        ↓

CONTROLLER
"What API does the frontend call?"

        ↓

FRONTEND
"What does the user see?"
```

Example:

```text
Post.java
   ↓
MongoRepo.java
   ↓
PostController.java
   ↓
React Home.jsx
```

Application:

```text
Applyjob.java
   ↓
Mango_apply_repo.java
   ↓
Apply_controllor.java
   ↓
React ApplyJob.jsx
```

---

# 62. Final Architecture

```text
                         JOB LISTINGS
                              |
          +-------------------+-------------------+
          |                                       |
          v                                       v
    REACT FRONTEND                         SPRING BOOT
          |                                       |
          | HTTP / JSON                           |
          +------------------->-------------------+
                                                  |
                                                  v
                                           CONTROLLERS
                                                  |
                                      +-----------+-----------+
                                      |                       |
                                      v                       v
                               PostController        Apply_controllor
                                      |                       |
                                      v                       v
                                  MongoRepo          Mango_apply_repo
                                      |                       |
                                      +-----------+-----------+
                                                  |
                                                  v
                                               MONGODB
                                                  |
                                      +-----------+-----------+
                                      |                       |
                                      v                       v
                                   JobPost                   apply
                                  collection               collection
```

---

# 63. Recommended Future Improvements

The current project can be extended with:

```text
1. Update Job
2. Delete Job
3. Get all applications
4. Get one application
5. Admin dashboard
6. Login and registration
7. User authentication
8. Job categories
9. Job location
10. Salary range
11. Company name
12. Pagination
13. Better search
14. Resume upload
15. Application status
16. Email notification
17. Swagger / OpenAPI documentation
```

A future application flow could be:

```text
User
 |
 +--> Search Jobs
 |
 +--> View Job
 |
 +--> Apply
 |      |
 |      +--> Personal Details
 |      +--> Resume
 |      +--> Submit
 |
 +--> Track Application
```

---

# 64. Beginner Mental Model

When you open this project months later, remember these four questions:

### 1. Where is my data defined?

Look in:

```text
Model/
```

### 2. How do I save/read the data?

Look in:

```text
Repository/
```

### 3. Which URL does the frontend call?

Look in:

```text
Controllor/
```

### 4. What does the user see?

Look in:

```text
job-listings-frontend/src/
```

The basic pattern is:

```text
MODEL
  ↓
REPOSITORY
  ↓
CONTROLLER
  ↓
API
  ↓
REACT
  ↓
USER
```

And when data is being saved:

```text
USER
  ↓
REACT
  ↓
HTTP POST
  ↓
CONTROLLER
  ↓
REPOSITORY
  ↓
MONGODB
```

This is the most important flow to remember.
