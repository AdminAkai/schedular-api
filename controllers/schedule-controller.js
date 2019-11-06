
const express = require('express')


const scheduleApi = require('../models/schedule-model.js')


const scheduleRouter = express.Router()

async function routeCurrentUser (id) {
  try {
    const user = await scheduleApi.getUser(id)
    return res.status(200).json(user)
  } catch(e) {
    const message = 'Failed to get user'
    res.status(500).json({
      error: e,
      message,
    })
  }
}

// Login
scheduleRouter.post('/verify', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  try {
    const verifiedUser = await scheduleApi.verifyAuth(req.body.username, req.body.password)
    console.log(verifiedUser)
    return res.status(200).json(verifiedUser)
  } catch(e) {
    const message = 'Failed to verify user'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Dashboard of user
scheduleRouter.get('/dashboard/:id', (req, res) => {
  routeCurrentUser(req.params.id)
})

// Edit profile screen
scheduleRouter.get('/dashboard/edit/:id', (req, res) => {
  routeCurrentUser(req.params.id)
})

module.exports = {
  scheduleRouter
}
