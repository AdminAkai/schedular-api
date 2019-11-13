
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Navbar from './Navbar'
export default class EditSchedule extends Component {


    state = {
        allUsers: [],
        currentDate: '',
        currentUserAdmin: false,
        currentScheduleId: '',
        dateScheduled: '',
        scheduledToName: '',
        scheduledToId: '',
    }


    componentDidMount() {
        this.getDifferentUsers()
        this.setDateTime()
    }

    setDateTime = () => {
        const dateTime = new Date();
        let formatdateTime = moment(dateTime).format("YYYY-MM-DD")
        this.setState({currentDate: formatdateTime})
        return formatdateTime
    }

    getCurrentSchedule = async () => {
        const currentSchedule = await axios.get(`/api/getschedules/${this.props.match.scheduleId}`)
        const thisSchedule = {
            dateScheduled: currentSchedule.data.dateScheduled,
            scheduledToName: currentSchedule.data.scheduledToName,
            scheduleToId: currentSchedule.data.scheduleToId
        }
        this.setState({thisSchedule})
    }

    getDifferentUsers = async () => {
        const allUsers = await axios.get('/api/getusers/')
        this.setState({allUsers: allUsers.data}) 
    }

    getCurrentUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.id}`)
        this.setState({currentUserAdmin: currentUser.data.isAdmin})
    }

    render() {

        const differentUsers = this.state.allUsers.map((users) => {
            return (
                <option key={users._id} value={users._id}>{users.username}</option>
            )
        })

        let formatdateTime = moment(this.state.dateScheduled).format("YYYY-MM-DD")

        return (
            <div>
                <Navbar 
                    currentProfile={this.props.match.params.id} 
                    isAdmin={this.state.isAdmin}
                />                
                <div className="schedule-container">
                    <h4>Scheduled To:</h4>
                    <p>{this.state.scheduledToName}</p>
                    <form>
                        <select className="select-name">
                            {differentUsers}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}
