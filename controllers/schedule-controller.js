
const express = require('express')


const scheduleApi = require('../models/schedule-model.js')


const scheduleRouter = express.Router()

// async function routeCurrentUser (req, res) {
//   try {
//     const user = await scheduleApi.getUser(id)
//     return res.status(200).json(user)
//   } catch(e) {
//     const message = 'Failed to get user'
//     res.status(500).json({
//       error: e,
//       message,
//     })
//   }
// }

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
scheduleRouter.get('/api/dashboard/:id', async (req, res) => {
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

// Edit profile screen
scheduleRouter.get('/api/dashboard/edit/:id', async (req, res) => {
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

// Edit Profile
scheduleRouter.put('/api/dashboard/edit/:id', async (req, res) => {
  try {
    const editedUser = await scheduleApi.updateUser(req.params.id, req.body)
    return res.status(200).json(editedUser)
  } catch(e) {
    const message = 'Failed to edit user'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Delete Profile
scheduleRouter.delete('/api/dashboard/delete/:id', async (req, res) => {
  try {
    const deletedUser = await scheduleRouterApi.deletedUser(req.params.id)
    return res.status(200).json(editedUser)
  } catch(e) {
    const message = 'Failed to delete user'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

module.exports = {
  scheduleRouter
}
