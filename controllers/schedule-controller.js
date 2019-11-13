
const express = require('express')


const scheduleApi = require('../models/schedule-model.js')


const scheduleRouter = express.Router()

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

// View Messages
scheduleRouter.get('/api/messages/:id', async (req, res) => {
  try {
    const userMessages = await scheduleApi.getUserMessages(req.params.id)
    return res.status(200).json(userMessages)
  } catch(e) {
    const message = 'Failed to get user messages'
    res.status(500).json({
      error: e,
      message,  
    })
  }
})

// Create Message
scheduleRouter.post('/api/send-message', async (req, res) => {
  try {
    const newMessage = await scheduleApi.sendMessage(req.body)
    return res.status(200).json(newMessage)
  } catch(e) {
    const message = 'Failed to send message'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Create User
scheduleRouter.post('/api/createuser/', async (req, res) => {
  try {
    const newUser = await scheduleApi.addNewUser(req.body)
    return res.status(200).json(newUser)
  } catch(e) {
    const message = 'Failed to create user'
    res.status(500).json({
      error: e,
      message
    })
  }
})

// Get Users
scheduleRouter.get('/api/getusers/', async (req, res) => {
  try {
    const allUsers = await scheduleApi.getAllUsers()
    return res.status(200).json(allUsers)
  } catch(e) {
    const message = 'Failed to get users'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Get Admin
scheduleRouter.get('/api/getadmin/', async (req, res) => {
  try {
    const Admin = await scheduleApi.getAdmin()
    return res.status(200).json(Admin)
  } catch(e) {
    return false
  }
})

// Get User
scheduleRouter.get('/api/getusers/:id', async (req, res) => {
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

// Create schedule
scheduleRouter.post('/api/createschedule', async(req, res) => {
  try {
    const newSchedule = await scheduleApi.addNewSchedule(req.body)
    return res.status(200).json(newSchedule)
  } catch(e) {
    const message = 'Failed to create schedule'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Get all schedules
scheduleRouter.get('/api/getschedules', async (req, res) => {
  try {
    const allSchedules = await scheduleApi.getAllSchedules()
    return res.status(200).json(allSchedules) 
  } catch(e) {
    const message = 'Failed to get all schedules'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

// Get Schedule
scheduleRouter.get('/api/getschedules/:id', async (req, res) => {
  try {
    const schedule = await scheduleApi.getSchedule(req.params.id)
    return res.status(200).json(schedule)
  } catch(e) {
    const message = 'Failed to get schedule'
    res.status(500).json({
      error: e,
      message
    })
  }
})

// Edit Schedule
scheduleRouter.put('/api/schedules/edit/:id', async (req, res) => {
  try {
    const editedSchedule = await scheduleApi.updateSchedule(req.params.id, req.body)
    return res.status(200).json(editedSchedule)
  } catch(e) {
    const message = 'Failed to edit schedule'
    res.status(500).json({
      error: e,
      message,
    })
  }
})

module.exports = {
  scheduleRouter
}
