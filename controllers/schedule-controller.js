
const express = require('express')


const scheduleApi = require('../models/schedule-model.js')


const scheduleRouter = express.Router()

// Login
scheduleRouter.post('/', async (req, res) => {
  try {
    const verifiedUser = await scheduleApi.verifyAuth(req.body.username, req.body.password)
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
scheduleRouter.get('/dashboard/:id', async (req, res) => {
  try {
    const user = await scheduleApi.getUser(req.params.id)
    return res.status(200).json(user)
  } catch(e) {
    const message = 'Failed to get user'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

module.exports = {
  scheduleRouter
}
