
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar.js'
import Schedular from './Schedular.js'
import moment from 'moment'

export default class Dashboard extends Component {

    currentRoute = this.props.match.params.id

    state = {
        allSchedules: [],
        currentDate: "",
        _id: '',
        email: '',
        isAdmin: false,
        username: '',
    }

    componentDidMount() {
        this.getDashboard()
        this.getSchedules()
        this.setDateTime()
    }

    setDateTime = () => {
        const dateTime = new Date();
        let formatdateTime = moment(dateTime).format("YYYY-MM-DD")
        this.setState({currentDate: formatdateTime})
        return formatdateTime
    }

    getSchedules = async () => {
        const allSchedules = await axios.get('/api/getschedules')
        this.setState({allSchedules: allSchedules.data})
    }

    generateSchedule = async (event) => {
        event.preventDefault()
        const currentDate = this.setDateTime()
        if (this.state.allSchedules[0]) {
            if ('dateScheduled' in this.state.allSchedules[0] === currentDate) {
                const daySchedule = this.setDateTime()
                const allUsers = await axios.get('/api/get-nonadmin-users/')
                console.log(allUsers.data)
                allUsers.data.forEach(async (user) => {
                    console.log(user)
                    const newSchedule = {
                        dateScheduled: daySchedule,
                        scheduledToName: user.username,
                        scheduledToId: user._id
                    }
                    console.log(newSchedule)
                    await axios.post('/api/createschedule', newSchedule)
                    this.getSchedules()
                })
            } else {
                alert('Already have schedule generated for today')
            }
        } else {
            const daySchedule = this.setDateTime()
            const allUsers = await axios.get('/api/getusers/')
            console.log(allUsers.data)
            allUsers.data.forEach(async (user) => {
                console.log(user)
                const newSchedule = {
                    dateScheduled: daySchedule,
                    scheduledToName: user.username,
                    scheduledToId: user._id
                }
                console.log(newSchedule)
                await axios.post('/api/createschedule', newSchedule)
                this.getSchedules()
        })
    }
}

    getDashboard = async () => {
        const currentDashboard = await axios.get(`/api/dashboard/${this.currentRoute}`)
        const currentUser = {
            _id: currentDashboard.data._id,
            email: currentDashboard.data.email,
            username: currentDashboard.data.username,
            isAdmin: currentDashboard.data.isAdmin,
        }
        this.setState(currentUser)
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
                        <button 
                            onClick={this.generateSchedule}
                            className='submit'
                        >
                            Generate Schedule
                        </button>
                    : 
                        null
                    }
                    {this.state.allSchedules ? 
                        <Schedular 
                        schedules={this.state.allSchedules} 
                        date={this.state.currentDate} 
                        admin={this.state.isAdmin}
                        user={this.props.match.params.id}
                        />
                    :
                        null
                    }
                </div>
            </div>
        )
    }
}
