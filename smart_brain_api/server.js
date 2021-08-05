const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

//import controllers for end-points
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({ // create variable which uses database called 'bd' using knex.js
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true
    }
  });

const app = express()
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => { res.send('it is working!')})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // add the dependencies ('db' and 'bcrypt') for use in ./controllers/register.js [also known as dependency injection]

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})