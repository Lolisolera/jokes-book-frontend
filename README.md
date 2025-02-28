# Jokes Book API Project

## Overview
Jokes Book is a full-stack web application that allows users to view, add, and manage jokes. The project consists of:
- A **frontend** built with **TypeScript, Vite, and SCSS**
- A **backend** built with **Java Spring Boot** and a **MySQL database**

## Features
### Frontend
- **Joke of the Day**: Displays a random joke dynamically.
- **Menu Options**:
  - View all jokes
  - View jokes by category (Dark, Futuristic, Geeks)
- **Joke Management**:
  - Add a new joke using a form (Category, Author, and Tags included)
  - Delete a joke by entering its ID
  - Delete all jokes

### Backend
- REST API built with **Spring Boot** to handle CRUD operations for jokes
- **MySQL database** to store joke data
- API endpoints to fetch, add, delete, and manage jokes

## Technologies Used
### Frontend
- TypeScript
- Vite
- SCSS
- Fetch API (to interact with the backend)

### Backend
- Java Spring Boot
- MySQL Database
- JPA (Java Persistence API) for database operations
- RESTful API design

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (for frontend)
- **Java 17+** (for backend)
- **MySQL** (for database)


### Frontend Setup
1. Clone the frontend repository:
   ```sh
   git clone <frontend-repo-url>
   cd jokes-book-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```



## License
This project is licensed under the MIT License.

