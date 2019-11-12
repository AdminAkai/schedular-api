import React, { Component } from 'react'
import axios from 'axios'

export default class Schedular extends Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    }

    render() {
    return (
      <div className="calendar">
        <h1>Hello World</h1>
      </div>
    );
  }
}
