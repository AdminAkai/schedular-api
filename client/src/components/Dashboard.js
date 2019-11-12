
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar.js'
import Schedular from './Schedular.js'

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
        const currentDashboard = await axios.get(`/api/dashboard/${this.currentRoute}`)
        this.setState(currentDashboard.data)
    }

    // generateSchedule = async () => {

    // }

    render() {
        return (
            <div>
                <Navbar 
                    currentProfile={this.props.match.params.id} 
                    isAdmin={this.state.isAdmin}
                />
                <div className="component-container">
                    <button onClick={this.generateSchedule}>Generate Schedule</button>
                    <Schedular />
                </div>
            </div>
        )
    }
}
