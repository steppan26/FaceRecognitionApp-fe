const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({ // create variable which uses database called 'bd' using knex.js
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Paziols26',
      database : 'smartbrain'
    }
  });

const app = express()
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login') // select the 'email' and 'hash' values from the 'login' table
        .where('email', '=', req.body.email) // where the email provided by the user (req.body.email) matches
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash) // use bcrypt to compare whether the hash of that user matches the password entered by the user
            if (isValid) { // if the password and hash match, then...
                return db.select('*').from('users') //use return so that the db.select has a value to use
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password) // create 'hash' variable which includes the user's password's hash key
        db.transaction(trx => { //if updating more than one database, must combine them in a transaction
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login') // insert above object into the 'login' table
            .returning('email') // return the e-mail to be used in the next table
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0], //loginEmail is an array, so return first element
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit) // if all conditions are met without error, commit into the databases
            .catch(trx.rollback) //if an error is received, rollback the databases and cancel changes
        })
        .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    db.select('*').from('users').where({id}) // select all columns from 'users' table where id matches
        .then(user => {
            if (user.length){ // if array returned is not empty
            res.json(user[0])
            } else { // respond with status 400
                res.status(400).json('Not Found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body
    db('users').where('id', '=', id) //if the 'users' table's 'id' value is equal to id in the request
    .increment('entries', 1)
    .returning('entries') //grab the 'entries' value after having updated it
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})
