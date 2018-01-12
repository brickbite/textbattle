# textbattle

## Features:
- Create characters (enter a name)
- Retrieve created characters (by entering name)
- Battle characters and see the action log

## Starting the App:
1. clone this repo, navigate to the directory, and ```npm install```
1. use ```npm run webpack``` and ```npm start``` to build the client and start the server. Server will be listening on localhost:3000
1. database will be seeded with some default characters on server start

## characterdata:
- name: string
- hp: integer
- exp: integar
- atk: integer
- armor: integer
- shield: integer
- bounty: integer

## Tech Stack:
- React client
- Node.js server (with Express)
- sqlite database
