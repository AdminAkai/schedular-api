import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'



export default class Messages extends Component {

    state = {
        messages: [],
        allUsers: [],
        messageContent: '',
        dateSent: '',
        sentByName: '',
        sentToName: '',
        sentById: '',
        sentToId: '',
    }

    componentDidMount() {
        this.setUser()
        this.getDifferentUsers()
        setInterval(this.getMessages, 1000)
        setInterval(this.setDateTime, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.getMessages())
    }

    setDateTime = () => {
        var today = new Date()
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
        var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
        var dateTime = date+' '+time
        this.setState({dateSent: dateTime})
    }

    getMessages = async () => {
        const currentMessages = await axios.get(`/api/messages/${this.props.match.params.id}`)
        this.setState({messages: currentMessages.data})
    }

    setUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.params.id}`) 
        const currentUserInfo = {
            sentById: currentUser.data._id,
            sentByName: currentUser.data.username
        }
        this.setState(currentUserInfo)
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        console.log(`${event.target.name}: ${event.target.value}`)
        this.setState(previousData)
    }

    setSendData = (event) => {
        this.setState({sentToId: event.target.value}, async () => {
            const sentUserData = await axios.get(`/api/getusers/${this.state.sentToId}`)
            this.setState({sentToName: sentUserData.data.username})
        })
    }

    getDifferentUsers = async () => {
        const allUsers = await axios.get('/api/getusers/')
        this.setState({allUsers: allUsers.data}) 
    }

    sendMessage = async (event) => {
        event.preventDefault()
         const newMessage = {
            messageContent: this.state.messageContent,
            dateSent: this.state.dateSent,
            sentByName: this.state.sentByName,
            sentToName: this.state.sentToName,
            sentById: this.state.sentById,
            sentToId: this.state.sentToId,
         }
         await axios.post('/api/send-message', newMessage)
         this.getMessages()
    }

    render() {
        const allMessages = this.state.messages.map((message, i) => {
            return (
                <div className="message-container  ">
                    <p key={message._id} className="message">{message.sentByName}: {message.messageContent}</p>
                    <p key={i} className="date-subtext">Sent: {message.dateSent}</p>
                </div>
            )
        })

        
        const differentUsers = this.state.allUsers.map((users) => {
            return (
                <option key={users._id} value={users._id}>{users.username}</option>
            )
        })

        return (

            <div>
                <Navbar currentProfile={this.props.match.params.id} editPage={false}/>
                <select name="sentToId" onChange={this.setSendData}>
                    {differentUsers}
                </select>
                <div className="message-box"> 
                <div className="all-messages">
                    {allMessages}
                </div>
                <form>
                    <input
                        type="text"
                        name="messageContent"
                        onChange={this.onTextChange}
                    ></input>
                    <input
                        type="submit"
                        value="send"
                        onClick={this.sendMessage}
                    ></input>
                </form>
                </div>
            </div>  
        )
    }
}
