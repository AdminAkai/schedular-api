
import React, { Component } from 'react'
import axios from 'axios'

export default class HelloWorld extends Component {


    state = {
        allSchedules: [],
    }

    componentDidMount() {
        this.getEverySchedule()
    }

    getEverySchedule = async () => {
        const allSchedules = await axios.get('/api/getschedules')
        this.setState({allSchedules: allSchedules.data})
    }

    render() {

        const scheduleElements = this.state.allSchedules.map((schedule) => {
            return(
                <div>
                    <h3>{schedule}</h3>
                </div>
            )
        })

        return (
            <div>
                {scheduleElements}
            </div>
        )
    }
}
