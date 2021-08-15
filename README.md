# Test Node/Express Typescript

RESTful API based on ExpressTs.

![NodeJs](https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white) ![ExpressJs](https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white)

## Prerequisite

- node js version >= 10.xx.x
- npm version >= 6.xx.x
- express version >= 4.xx.x
- typescript (tsc) version >= 4.xx.x
- mongod (mongoDB server) version = 4.4.8

## Run Locally

> I Assume that you installed all the prerequisite globally

- Create 2 databases (for development & for testing)
- Create a .env file, copy inside it all the variables inside .env.example and add the right value for the all .env variables

Clone the project

```bash

git clone https://github.com/MaxR522/Test-node-api.git

```

Go to the project directory

```bash

cd Test-node-api

```

Install dependencies

```bash

npm install

```

Start dev server

```bash

npm run dev

```

Start prod server

```bash

npm start

```

Start test server

```bash

npm run test

```

## Features

- Authentication using JWT (access-token & refresh-token) & bcrypt for crypting
- Register
- Login
- Logout
- Update User's info
- Update User's password
- Get one user
- Get All users

## Call the API

Header for sending json format:

```

Content-Type:application/x-www-form-urlencoded

Accept:application/json

```

**access-token expiry time:** 24 hour <br /> **refresh-token expiry time:** 60 days
