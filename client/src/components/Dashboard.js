
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar.js'

export default class Dashboard extends Component {

    currentRoute = this.props.match.params.id

    state = {
        _id: '',
        email: '',
        isAdmin: false,
        password:'',
        username: '',
    }

    componentDidMount() {
        this.getDashboard()
    }

    getDashboard = async () => {
        const test = await axios.get(`/dashboard/${this.currentRoute}`)
        this.setState(test.data)
    }

    render() {
        return (
            <div>
                <Navbar currentProfile={this.props.match.params.id}/>
                <h1>Hello World</h1>
                <h1>{this.state.username}</h1>
            </div>
        )
    }
}
