# EVENTS-LIST-SERVER

### Live : https://event-list-server.herokuapp.com/

### Client repo: https://github.com/ArkadiuszSa/react-form

### Description

Rest api created for react client. Api was created from scratch. For auth I used JWT.
Main techs:

- Nodejs, Express
- Mongoose, MLab
- Typescript, ts-node
- Mocha/Chai

### Instalation and scripts

To start the app you should run `yarn install` and `yarn watch`. By default you can use db connection strings stored in .env file.

- `build` - is responsible to run ts-node and map .ts files on .js in /dist folder.
- `start` - should run server.js with nodemon in /dist folder
- `watch` - run server.ts in lib folder
- `test` - run mocha/chai tests with real database
- `test-noDb` - run mocha/chai tests with mocked database

### Tests

I created only integration tests with mocha/chai that check if the endpoints work properly i.e. is data correct, is validation and authGurad work. I also created basic stress tests for endpoints designed for user.

### Models

##### User

| Name     | Type   |
| -------- | ------ |
| email    | string |
| password | string |

##### Happening

| Name        | Type     |
| ----------- | -------- |
| title       | string   |
| description | string   |
| days        | string[] |
| price       | string   |

##### Application

| Name        | Type   |
| ----------- | ------ |
| happeningId | string |
| firstName   | string |
| lastName    | string |
| email       | string |
| date        | date   |

### Routes

##### Auth

| Route     | Method | Action                        | Protected |
| --------- | ------ | ----------------------------- | --------- |
| /login    | POST   | if data is correct send token | no        |
| /register | POST   | create new user               | no        |

There is a posibility to register new user, but on client only admin is important. Registred user don't have additional permissions. User registered with email admin@admin.com will get admin role.

##### Happening

User can only get happening/s.
| Route | Method | Action | Protected |
|----------------|--------|------------------------|---------------|
| /happenings | GET | get all happenings | no |
| /happening/:id | GET | get happening by id | no |
| /happening | POST | create new happening | by admin role |
| /happening/:id | PUT | update happening by id | by admin role |
| /happening/:id | DELETE | delete happening by id | by admin role |

##### Application

User can only add new application.
| Route | Method | Action | Protected |
|------------------|--------|--------------------------|---------------|
| /applications | GET | get all applications | by admin role |
| /application/:id | GET | get application by id | by admin role |
| /application | POST | create new application | no |
| /application/:id | PUT | update application by id | by admin role |
| /application/:id | DELETE | delete application by id | by admin role |
