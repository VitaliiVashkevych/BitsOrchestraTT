## How to start

- clone this repo
- run `npm i` to install dependencies

In the first terminal, run `npx json-server src/db/db.json`. By default, it starts on port 3000, if it is already used, run `npx json-server src/db/db.json --port {VALUE}`, and change `src/post.ts -> DB_PORT = {VALUE}`

In the second terminal, run `npm run dev` and open `http://localhost:5173` in browser