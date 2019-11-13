import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
        allSchedules: this.props.allSchedules,
        currentDate: this.props.currentDate,
        currentUser: this.props.currentUser,
        isAdmin: this.props.isAdmin
      }
      this.setState(currentState)
    }

    specificDashboard = `/dashboard/schedule/${this.props.currentUser}/`
    toMessages = `/dashboard/messages/${this.props.currentUser}`

    deleteSchedule = async (event) => {
      event.preventDefault()

    }

    render() {

    const renderSchedules = this.props.allSchedules.map((schedule) => {
      let scheduleId = this.specificDashboard + schedule._id
      return (
        <div className="schedules">
          <h4>Scheduled To:</h4>
          <p>{schedule.scheduledToName}</p>
          <Link className="submit" to={scheduleId}>Edit Schedule</Link>
          <Link className="submit" to={this.toMessages}>Conflict</Link>      
          <button
            className="submit"
            onClick={this.deleteSchedule}
          >
            Delete Schedule
          </button>
        </div>
      )
    })

    return (
      <div className="calendar-container">
        <h4>Scheduled for Current Date: {this.props.currentDate}</h4>
        <div className="calendar">
          {renderSchedules}
        </div>
      </div>
    );
  }
}
