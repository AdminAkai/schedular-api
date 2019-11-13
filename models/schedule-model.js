0.0000
const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  availability: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const SchedSchema = new mongoose.Schema({
  dateScheduled: {
    type: Date,
    required: true,
  },
  scheduledToName: {
    type: String,
    required: true,
  },
  scheduledToId: mongoose.Types.ObjectId
})

const MessageSchema = new mongoose.Schema({
  messageContent: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    required: true,
  },
  sentByName: {
    type: String,
    required: true,
  },
  sentToName: {
    type: String,
    required: true,
  },
  sentById: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sentToId: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
})

const UserCollection = mongoose.model('Users', UserSchema)
const ScheduleCollection = mongoose.model('Schedule', SchedSchema)
const MessageCollection = mongoose.model('Messages', MessageSchema)

// User Model Functions
const getAllUsers = () => {
  return UserCollection.find({}).sort({username: 'ascending'})
}

const getNonAdminUsers = () => {
  return UserCollection.find({isAdmin: false}).sort({username: 'ascending'})
}

const getUser = (id) => {
  return UserCollection.findById({_id: id})
}

const addNewUser = (data) => {
  return UserCollection.create(data)
}

const updateUser = (id, updateData) => {
  return UserCollection.updateOne({_id: id}, updateData)
}

const deleteUser = (id) => {
  return UserCollection.deleteOne({_id: id})
}

const getAdmin = () => {
  return UserCollection.find({username: "admin"})
}

const verifyAuth = async (username, password) => {
  const verifyUser = await UserCollection.findOne({username: username})
  if (password === verifyUser.password) {
    return verifyUser
  } else {
    message = "error"
    return message
  }
}

// Schedule Model Functions
const getAllSchedules = async () => {
  const schedules = await ScheduleCollection.find({}).sort({dateScheduled: 'ascending'})
  return schedules
}

const getUserSchedules = async (id) => {
  const schedules = await ScheduleCollection.find({scheduledTo: id}).sort({dateScheduled: 'ascending'})
  return schedules
}

const getSchedule = (id) => {
  return ScheduleCollection.findById({_id: id})
}

const addNewSchedule = async (newData) => {
  const newSchedule = await ScheduleCollection.create(newData)
  return newSchedule 
}

const updateSchedule = (id, updatedSchedule) => {
  return ScheduleCollection.updateOne({_id: id}, updatedSchedule)
}

const deleteSchedule = (id) => {
  return ScheduleCollection.deleteOne({_id: id})
}

// Message Model Functions
const getAllMessages = async () => {
  const messages = await MessageCollection.find({}).sort({dateSent: 'ascending'})
  return messages
}

const getUserMessages = async (id) => {
  const userMessages = await MessageCollection.find({}).sort({dateSent: 'ascending'})
  return userMessages
}

const sendMessage = async (newMessage) => {
  const message = await MessageCollection.create(newMessage)
  return message
}

const deleteMessage = (id) => {
  return MessageCollection.deleteOne({_id: id})
}

module.exports = {
  getAllUsers,
  getUser,
  addNewUser,
  getNonAdminUsers,
  updateUser,
  getAdmin,
  deleteUser,
  verifyAuth,
  getAllSchedules,
  getUserSchedules,
  getSchedule,
  addNewSchedule,
  updateSchedule,
  deleteSchedule,
  getAllMessages,
  getUserMessages,
  sendMessage,
  deleteMessage
}