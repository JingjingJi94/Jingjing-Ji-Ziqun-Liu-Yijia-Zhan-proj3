# battleship-game

## 1. GitHub Repository
[Link to GitHub Repo](https://github.com/JingjingJi94/Jingjing-Ji-Ziqun-Liu-Yijia-Zhan-proj3)

## 2. Video Link
[Link to Video](https://northeastern.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=bbf0f4a4-d804-43f4-b2)

## 3. Render App
[Link to Render App](https://jingjing-ji-ziqun-liu-yijia-zhan-proj3.onrender.com/)

## 4. Writeup

### 4.1 Challenges in the Assignment
Querying the database was slightly challenging, as I needed to learn how to write correct syntax for operators such as $nor and $ne.
Determining what to render on the player’s board versus the opponent’s board based on the currently logged-in user was tricky. It also took effort to figure out which routes should be accessible only to authenticated users.
Debugging was another challenge, we often had to check the console for logs and error messages to identify and fix issues efficiently.


### 4.2 Given more time, what additional features, functional or design changes would you make?
We would like to add an invite feature, where players can send invitations to other users to join a game. Along with that, a "request to become friends" feature would allow players to build a friend list, making it easier to find and play with people they enjoy gaming with.
Another feature that would be interesting to implement is real-time gameplay, where the game state updates for both players instantly—without needing to refresh the page or re-enter the game.


### 4.3 What assumptions did you make while working on this assignment?
- users will not manual change browser’s cookie to usernames other than his own, otherwise he could gain access to other’s information including game states, user information ,etc.
- users would not manually modify their browser cookies to impersonate other usernames. If they did, they could potentially gain unauthorized access to other users’ information, including game states and personal data.
- users would not directly access API endpoints (e.g., those under /api/). These endpoints are intended for internal communication between the frontend and backend of the application, not for direct user interaction.


### 4.4 How long did this assignment take to complete?
18-25 hours in total from each team members.

## 5. Collaborators
- Jingjing Ji
- Ziqun Liu
- Yijia Zhan

## 6. Attempted Bonus Points
- Early submission bonus



## Notes for collaborators
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
| `npm run start`  | —                                                                               | Directly runs `server.js` using Node (no file watching)         | Used in `prod` to launch backend server     