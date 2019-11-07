
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
        const currentMessages = await axios.get('/api/')
    }

    render() {
        return (
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
