
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Navbar from './Navbar'
export default class EditSchedule extends Component {


    state = {
        currentUserAdmin: false,
        currentScheduleId: '',
        dateScheduled: '',
        scheduledToName: '',
        scheduledToId: '',
    }


    componentDidMount() {
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

    getCurrentUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.id}`)
        this.setState({currentUserAdmin: currentUser.data.isAdmin})
    }

    render() {

        let formatdateTime = moment(this.state.dateScheduled).format("YYYY-MM-DD")

        return (
            <div>
                <Navbar 
                    currentProfile={this.props.match.params.id} 
                    isAdmin={this.state.isAdmin}
                />                
                <div className="calendar-container">
                    <h4>Scheduled To:</h4>
                    <p>{this.state.scheduledToName}</p>
                </div>
            </div>
        )
    }
}
