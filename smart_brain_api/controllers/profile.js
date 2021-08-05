const handleProfileGet = (req, res) => {
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
}

module.exports = {
    handleProfileGet
}