import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Schedular extends Component {

    state = {
      allSchedules: [],
      isAdmin: false,
      currentUser: '',
      currentDate: '',
    }

    componentWillMount() {
      this.setUpSchedular()
    }

    setUpSchedular = async () => {
      const currentState = {
        allSchedules: this.props.schedules,
        currentDate: this.props.date,
        currentUser: this.props.user,
        isAdmin: this.props.admin
      }
      this.setState(currentState)
    }

    specificDashboard = `/dashboard/schedule/${this.props.user}/`
    toMessages = `/dashboard/messages/${this.props.user}`

    deleteSchedule = async (event, scheduleId) => {
      event.preventDefault()
      await axios.delete(`/api/schedules/delete/${scheduleId}`)
    }

    render() {

    const renderAdminSchedules = this.props.schedules.map((schedule) => {
      let scheduleId = this.specificDashboard + schedule._id
      return (
        <div className="schedules">
          <h4>Scheduled To:</h4>
          <p>{schedule.scheduledToName}</p>
          <Link className="submit" to={scheduleId}>Edit Schedule</Link>
          <Link className="submit" to={this.toMessages}>Conflict</Link>      
          <button
            className="submit"
            onClick={(event) => {this.deleteSchedule(event, schedule._id)}}
          >
            Delete Schedule
          </button>
        </div>
      )
    })

    // const renderSchedules = this.props.allSchedules.map((userSchedule) => {
    //   return (
    //     <div className="schedules">
    //       <h4>Scheduled To:</h4>
    //       <p>{userSchedule.scheduledToName}</p>
    //       <Link className="submit" to={this.toMessages}>Conflict</Link>      
    //     </div>
    //   )
    // })

    return (
      <div className="calendar-container">
        <div className="calendar">
            {renderAdminSchedules}
        </div>
      </div>
    );
  }
}
