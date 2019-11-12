import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import moment from 'moment'



export default class Messages extends Component {

    state = {
        isMessages: true,
        messages: [],
        allUsers: [],
        messageContent: '',
        dateSent: '',
        sentByName: '',
        sentToName: '',
        sentById: '',
        sentToId: '',
    }

    messagesEndRef = React.createRef()

    componentDidMount() {
        this.setUser()
        this.getDifferentUsers()
        setInterval(this.getMessages, 1000)
        setInterval(this.setDateTime, 1000)
    }

    // componentDidUpdate() {
    //     this.scrollToBottom()
    // }

    componentWillUnmount() {
        clearInterval(this.getMessages())
        clearInterval(this.setDateTime, 1000)
    }

    setDateTime = () => {
        const dateTime = new Date();
        let formatdateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
        this.setState({dateSent: formatdateTime})
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    getMessages = async () => {
        const currentMessages = await axios.get(`/api/messages/${this.props.match.params.id}`)
        if (currentMessages.data.length > this.state.messages.length) {
            this.setState({messages: currentMessages.data}, this.scrollToBottom)
        }
    }

    setUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.params.id}`) 
        const currentUserInfo = {
            sentById: currentUser.data._id,
            sentByName: currentUser.data.username,
        }
        this.setState(currentUserInfo)
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    setSendData = (event) => {
        console.log(event.target.value)
        this.setState({sentToId: event.target.value}, async () => {
            const sentUserData = await axios.get(`/api/getusers/${this.state.sentToId}`)
            this.setState({sentToName: sentUserData.data.username})
        })
        this.setUser()
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
         this.setState({messageContent: ''})
         this.getMessages()
         this.scrollToBottom()
    }

    render() {
        const allMessages = this.state.messages.map((message, i) => {
            if (message.sentById === this.state.sentById) {
                return (
                    <div className="message-container-user">
                        <p key={message._id} className="message">{message.messageContent}</p>
                        <p key={i} className="date-subtext-user">Sent: {moment(message.dateSent).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </div>
                )
            } else if (message.sentById === this.state.sentToId) {
                return (
                    <div className="message-container">
                        <p key={message._id} className="message">{message.sentByName}: {message.messageContent}</p>
                        <p key={i} className="date-subtext">Sent: {message.dateSent}</p>
                    </div>
                )
            }
        })

        
        const differentUsers = this.state.allUsers.map((users) => {
            return (
                <option key={users._id} value={users._id}>{users.username}</option>
            )
        })

        return (

            <div>
                <Navbar currentProfile={this.props.match.params.id} editPage={false} messagesPage={this.state.isMessages}/>
                <div className="message-area">
                    <h1>Current user: {this.state.sentByName}</h1>
                    <select className="select-name" name="sentToId" onChange={this.setSendData}>
                        {differentUsers}
                    </select>
                    <div className="message-box"> 
                        <div className="all-messages">
                            {allMessages}
                            <div ref={this.messagesEndRef} />
                        </div>
                        <form className="message-form">
                            <input
                                type="text"
                                name="messageContent"
                                onChange={this.onTextChange}
                                value={this.state.messageContent}
                            ></input>
                            <input
                                className="submit-messages"
                                type="submit"
                                value="send"
                                onClick={this.sendMessage}
                            ></input>
                        </form>
                    </div>
                </div>
            </div>  
        )
    }
}
