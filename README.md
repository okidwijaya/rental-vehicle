# arka-rental-vehicle
This is server side of vehicle rental project, this project provide reactjs and react native project.

[![express](https://img.shields.io/npm/v/react-router-dom?label=express)](https://www.npmjs.com/package/express)
[![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-blue)](https://www.npmjs.com/package/bcrypt)
[![nodemailer](https://img.shields.io/badge/nodemailer-6.7.3-blue)](https://www.npmjs.com/package/nodemailer)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-blue)](https://www.npmjs.com/package/jsonwebtoken)
[![multer](https://img.shields.io/badge/multer-1.4.4-blue)](https://www.npmjs.com/package/multer)
[![cors](https://img.shields.io/badge/cors-2.8.5-blue)](https://www.npmjs.com/package/cors)

# Installation
## 1. Clone this repository

Clone this repository by run the following code:

```
$ git clone https://github.com/okidwijaya/rental-vehicle
```
## 2. Go to directory

```
$ cd <your directory>
```

## 3. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
$ npm install
```

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our sql models.
- `controller/` - This folder contains the schema definitions for unctions that separate out the code to route requests from the code that actually processes requests.
- `middleware/` - This folder contains the schema definitions for middleware .

## Documentation

[Documentation]()


## Features

- Auth
    - Sign in
    - Sign up
    - Forgot password
- Product
    - Add
    - Edit
    - Delete
    - Update
 - Profile
    - Edit password
    - Update profile
 - Order
    - Create transaction
    - Edit transaction
    -Delete history

## API Reference Example

```http
  GET, POST /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | :------------------------- |


```http
  GET, POST, PATCH, DELETE /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | :-------------------------------- |

```http
  GET, POST, /payment
```

| Parameter | value    | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | :------------------------- |

```http
  DELETE /payment/${id}
```

| Parameter | value    | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `number` | :------------------------- |


## ENVIRONMENT VARIABLE

# App name
APP_NAME = # default App Name


# Configuration DB

## Deploy

[Heroku](arka-vehicle-rental.herokuapp.com)
