# battleship-game

Run the following for now to see frontend.
```bash
rm -rf node_modules package-lock.json
cd frontend/
npm install
npm run dev
```
Integrated the peer dependency `@vitejs/plugin-react`in package.json so that `vite.config.js` can be omitted.

| Script           | Frontend (how)                                                                 | Backend (how)                                                   | Root Command (how)                                                       |
|------------------|---------------------------------------------------------------------------------|------------------------------------------------------------------|---------------------------------------------------------------------------|
| `npm run dev`    | Runs `vite` — starts dev server with hot reload on `localhost:5173`            | Runs `nodemon server.js` — watches for changes and restarts     | `concurrently` runs both: `-w frontend` and `-w backend`                 |
| `npm run build`  | Runs `vite build` — compiles and outputs static files to `frontend/dist/`      | ❌ No `build` script defined                                     | Runs `npm run build -ws --if-present` — skips backend if no build exists |
| `npm run prod`   | —                                                                               | Runs `node server.js` — starts production Express backend       | Executes `npm run start -w backend`                                      |
| `npm run start`  | —                                                                               | Directly runs `server.js` using Node (no file watching)         | Used in `prod` to launch backend server                                  |

```
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gameController.js
│   │   ├── userController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Game.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gameRoutes.js
│   │   ├── userRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   │   ├── sessionConfig.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│
├── frontend/  # note: if you added this layer, make sure to update relevant paths accordingly
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── GameBoard.jsx
│   │   │   ├── GameCard.jsx
│   │   │   ├── GameControls.jsx
│   │   │   ├── ScoreCard.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── GamePage.jsx
│   │   │   ├── AllGamesPage.jsx
│   │   │   ├── HighScoresPage.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Game.css
│   │   ├── package.json
│   │   ├── .env
│
├── .gitignore
├── README.md
```

# Team Work Split for Fullstack Battleship Project

For this project, our team of 3 is dividing responsibilities based on both backend and frontend tasks to ensure a smooth, modular development process. The work split is as follows:

## Team Member 1: Backend Lead + MongoDB Integration
**Responsibilities:**
- **User Authentication System:**
  - Implement `/login`, `/register`, and `/logout` routes.
  - Handle password validation and session cookies.
- **Database Models & Security:**
  - Design Mongoose schemas (e.g., `User`, `Game`).
  - Enforce proper authorization to ensure users only access/modify their own data.
- **RESTful API Endpoints:**
  - Create endpoints for CRUD operations on games.
  - Update game state (hit/miss, turn-taking, win detection).
- **Password Encryption:** *(Bonus)*
  - Hash passwords using `bcrypt`.
- **Scoreboard Management:**
  - Implement API logic to record wins, losses, and display sorted high scores.

## Team Member 2: Frontend Lead - Game UI & Logic
**Responsibilities:**
- **Game Page (`/game/:game_id`):**
  - Render player and opponent boards.
  - Implement game interactions (e.g., hit/miss, turn notifications).
  - Show “You win!” messages when the game is completed.
- **Join Game Functionality:**
  - Allow users to join open games and auto-populate the second player's board.
- **Click and Drag Ship Placement:** *(Bonus)*
  - Implement drag-and-drop functionality to enable manual ship placement.
- **Guest User Restrictions:**
  - Disable board interactions when the user is logged out.

## Team Member 3: Frontend & Full App Integration
**Responsibilities:**
- **Routing & Navbar:**
  - Configure dynamic routing and navigation based on user authentication status.
  - Include buttons for navigating to `/games` and `/game/new` as well as the logout function.
- **All Games Page (`/games`):**
  - Display various game lists: Open, My Open, My Active, My Completed, and Other games.
- **Score Page (`/high-scores`):**
  - Implement score display with sorting and highlight of the logged-in user.
- **Styling and Responsiveness:**
  - Ensure a consistent, mobile-friendly design using a library like Tailwind, React Bootstrap, or Material UI.
- **Deployment:**
  - Manage deployment (e.g., on Render) and ensure proper connection to MongoDB Atlas.
  - Add collaborators to the GitHub repository.























## 1. GitHub Repository
[Link to GitHub Repo](https://github.com/JingjingJi94/Jingjing-Ji-Ziqun-Liu-project2)

## 2. Video Link
[Link to Video](https://northeastern.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=bbf0f4a4-d804-43f4-b2)

## 3. Render App
[Link to Render App](https://web-dev-project2.onrender.com)

## 4. Writeup

### 4.1 Challenges in the Assignment
We encountered some challenges during front-end debugging. The `index.css` file that came with the project setup interfered with our own CSS styles, resulting in effects that were not as desired. The browser’s inspect tool helped us drill down into the problem, allowing us to resolve the issue of conflicting classes with the same name, which were causing the interfering effects.

### 4.2 Given more time, what additional features, functional or design changes would you make?
We would implement a dynamic resizing feature to improve the user experience on mobile devices. Currently, our website uses a vertical scroll bar on small screens. By incorporating responsive design techniques, such as flexible layouts, media queries, and viewport adjustments, the website would automatically adjust to smaller screen sizes, providing a smoother and more intuitive browsing experience for mobile users. We would also like to improve the AI’s logic so that every time it hits a player’s board, it will only explore the surrounding cells for its next move. This approach is reasonable because ship placements occupy consecutive cells, and targeting the surrounding cells increases the likelihood of hitting a ship.

### 4.3 What assumptions did you make while working on this assignment?
We assumed that the user will not try to alter the content of the website.

### 4.4 How long did this assignment take to complete?
20 hours in total from both team members.

## 5. Collaborators
- Jingjing Ji
- Ziqun Liu

## 6. Attempted Bonus Points
- Early submission bonus
