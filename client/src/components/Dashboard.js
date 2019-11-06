
import React, { Component } from 'react'
import axios from 'axios'

export default class HelloWorld extends Component {

    state = {
        message: ''
    }

    componentDidMount() {
        this.getDashboard()
    }

    getDashboard = () => {
        axios.get('/dashboard/:id')
            .then((res) => {
                this.setState({message: res.data})
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
