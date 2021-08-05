const Clarifai = require('clarifai');
const { response } = require('express');

// This is the api key for the Clarifai face detection api. This key gets added to app
const app = new Clarifai.App({
    apiKey: '8509e0668a58483db493b84a27c67428'
  })

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id) //if the 'users' table's 'id' value is equal to id in the request
    .increment('entries', 1)
    .returning('entries') //grab the 'entries' value after having updated it
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}