
import React, { Component } from 'react'
import axios from 'axios'

export default class HelloWorld extends Component {

    state = {
        enteredUsername: '',
        enteredPassword: '',
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    verifyData = async (event) => {
        event.preventDefault()
        const currentUser = {
            name: this.state.enteredUsername,
            password: this.state.enteredPassword
        }
        const verification = axios.post('/dashboard', currentUser)
        if (verification) {
            this.getDashboard()
        } else {
            alert('Username/Password incorrect')
        }
    }

    render() {
        return (
            <div>
                <h1>SCHEDUL&lambda;R</h1>
                <div>
                <form>
                    <h4>Username</h4>
                    <input
                        name="enteredUsername"
                        type="string"
                        placeholder="Username"
                        required
                        onChange={this.onTextChange}
                        value={this.state.enteredUsername}
                    ></input>
                    <h4>Password</h4>
                    <input></input>
                    <h4>Admin</h4>
                    <select>
                        <option></option>
                        <option></option>
                    </select>
                    <input></input>
                </form>
                </div>
            </div>
        )
    }
}
