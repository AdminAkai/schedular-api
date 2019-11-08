
import React, { Component } from 'react'
import axios from 'axios'

export default class Messages extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        this.getMessages()
    }

    getMessages = async () => {
        const currentMessages = await axios.get(`/api/dashboard/messages/${this.props.match.params.id}`)
        console.log(currentMessages)
        this.setState({messages: currentMessages.data})
    }

    render() {
        let allMessages = this.state.messages.map((message) => {
            return (
                <p>{message}</p>
            )
        })

        return (
            <div>
                {allMessages}
            </div>
        )
    }
}
