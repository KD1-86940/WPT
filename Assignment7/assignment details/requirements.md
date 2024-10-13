# frontend requirements

## user

- login
- register
- put the property on rent
- rent a property
- get the list of rented properties
- cart functionality
- optional
  - payment services: stripe
  - dashboard

## property

- list of properties
- search a property
- book a property
- get lis of booked properties

# backend

## user

- register
- login
- change password
- edit profile
- wishlist
- delete an account

## property

- add a property
- list the properties
- show similar properties
- search properties
- book a property
- cancel a booking
- rate (feedback) a property
- get my bookings
- get my rented properties
- show property details

# special requirements

- user's email should be verified
- user should receive an email after registration
- user and owner should receive an email after booking a property
- user should be able to upload multiple photos of a property
- the application should save the user's data securely
  - the password must be stored in encrypted format
  - all the apis must be protected (JWT token)
- user should be able to recover a password (forgot password)
- optional
  - user should be able to pay using a payment gateway

# packages

- express
  - used for implementing REST web services
- mysql2
  - used for mysql communication
- mongoose
  - used for mongodb communication
- crypto-js
  - used for encryption and decryption
- cors
  - used for making the APIs available for frontend
- morgan
  - used for logging
- jsonwebtoken
  - used to add JWT token mechanism
- multer
  - used to add file upload functionality
- nodemailer

  - used to send email

```bash

# install yarn packages
> yarn add express mysql2 nodemailer multer jsonwebtoken cors moran crypto-js

```

- dev utilities
  - nodemon
    - used to restart the server automatically
  - yarn
    - replacement of npm
    - faster and better than npm
  - pm2
    - process manager to deploy the backend application

```bash

# install dev utilities
# -g: global (one time installation)
> sudo npm install -g nodemon yarn pm2

```

## videos

- backend
  - https://youtu.be/ak7ATSdos9w
- react
  - https://youtu.be/LcJlWocnVc8
