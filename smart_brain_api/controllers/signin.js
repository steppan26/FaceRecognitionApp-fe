const handleSignin = (req, res, db, bcrypt) => {
    const { email, password} = req.body
    if (!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login') // select the 'email' and 'hash' values from the 'login' table
        .where('email', '=', email) // where the email provided by the user (req.body.email) matches
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash) // use bcrypt to compare whether the hash of that user matches the password entered by the user
            if (isValid) { // if the password and hash match, then...
                return db.select('*').from('users') //use return so that the db.select has a value to use
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin : handleSignin
}