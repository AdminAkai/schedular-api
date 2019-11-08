
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

export default class Messages extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        setInterval(this.getMessages(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.getMessages())
    }

    getMessages = async () => {
        const currentMessages = await axios.get(`/api/dashboard/messages/${this.props.match.params.id}`)
        console.log(typeof(currentMessages.data))
        if (typeof(currentMessages.data)  === 'array') {
            this.setState({messages: currentMessages.data})
        }
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    sendMessage = async (event) => {
        const newMessage = { ...this.state }
    }

    render() {
        let allMessages = this.state.messages.map((message) => {
            return (
                <p>{message}</p>
            )
        })

        return (
            <div>
                <Navbar currentProfile={this.props.match.params.id} editPage={false}/>
                <div className="message-box"> 
                <div className="all-messages">
                    {allMessages}
                </div>
                <form>
                    <input
                        className="hidden"
                        type="date"
                    ></input>
                    <input
                        type="text"
                    ></input>
                    <input
                        type="submit"
                        value="send"
                    ></input>
                </form>
                </div>
            </div>  
        )
    }
}
