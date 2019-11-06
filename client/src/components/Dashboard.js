
import React, { Component } from 'react'
import axios from 'axios'

export default class Dashboard extends Component {

    currentRoute = this.props.match.params.id

    state = {
        currentUserId: '',
        currentUsername: '',
        currentPassword: '',
        currentEmail:'',
        isAdmin: false,
    }

    componentDidMount() {
        this.getDashboard()
    }

    getDashboard = async () => {
        const test = await axios.get(`/dashboard/${this.currentRoute}`)
        this.setState(test)
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <h1>{this.state.currentUsername}</h1>
            </div>
        )
    }
}
