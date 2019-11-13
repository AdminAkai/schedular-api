
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

    setDateTime = () => {
        const dateTime = new Date();
        let formatdateTime = moment(dateTime).format("YYYY-MM-DD")
        return formatdateTime
    }

    generateSchedule = async (event) => {
        event.preventDefault()
        const daySchedule = this.setDateTime()
        const allUsers = await axios.get('/api/getusers/')
        allUsers.forEach((user) => {
            const newSchedule = {
                dateScheduled: daySchedule,
                scheduledToName: user.username,
                scheduledToId: user._id
            }
            await axios.post('api/createschedule', newSchedule)
        })
    }

    getDashboard = async () => {
        const currentDashboard = await axios.get(`/api/dashboard/${this.currentRoute}`)
        this.setState(currentDashboard.data)
    }

    render() {
        return (
            <div>
                <Navbar 
                    currentProfile={this.props.match.params.id} 
                    isAdmin={this.state.isAdmin}
                />
                <div className="component-container">
                    {this.state.isAdmin ? 
                        <button onClick={this.generateSchedule}>Generate Schedule</button>
                    : 
                        null
                    }
                    <Schedular />
                </div>
            </div>
        )
    }
}
