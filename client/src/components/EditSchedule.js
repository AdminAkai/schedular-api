
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Navbar from './Navbar'
export default class EditSchedule extends Component {


    state = {
        selectedUser: '',
        editSchedulePage: true,
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
        this.getCurrentSchedule()
    }

    setDateTime = () => {
        const dateTime = new Date();
        let formatdateTime = moment(dateTime).format("YYYY-MM-DD")
        this.setState({currentDate: formatdateTime})
        return formatdateTime
    }

    getCurrentSchedule = async () => {
        const currentSchedule = await axios.get(`/api/getschedules/${this.props.match.params.scheduleId}`)
        console.log(currentSchedule)
        const thisSchedule = {
            dateScheduled: currentSchedule.data.dateScheduled,
            scheduledToName: currentSchedule.data.scheduledToName,
            scheduleToId: currentSchedule.data.scheduleToId
        }
        this.setState(thisSchedule)
    }

    getDifferentUsers = async () => {
        const allUsers = await axios.get('/api/get-nonadmin-users/')
        this.setState({allUsers: allUsers.data}) 
    }

    getCurrentUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.id}`)
        this.setState({currentUserAdmin: currentUser.data.isAdmin})
    }

    setScheduledTo = (event) => {
        this.setState({selectedUser: event.target.value})
    }

    sendEditData = async () => {
        const editSchedule = await axios.put(`/api/schedules/edit/${this.state.selectedSchedule}`)
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
                    isEditSchedulePage={this.state.editSchedulePage}
                />                
                <div className="schedule-container">
                    <form className="form">
                        <h4>Scheduled To:</h4>
                        <p>{this.state.scheduledToName}</p> 
                        <select className="select-schedule-to" name="selectedUser" onChange={this.setScheduledTo}>
                            {differentUsers}
                        </select>
                        <input
                            type="Submit"
                            className="submit"
                            value="Edit"
                        ></input>
                    </form>
                </div>
            </div>
        )
    }
}
