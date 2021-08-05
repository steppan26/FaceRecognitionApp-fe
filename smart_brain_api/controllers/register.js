const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }
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
}

// export module for use in server.js
module.exports = {
    handleRegister: handleRegister
}