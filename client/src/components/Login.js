
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class HelloWorld extends Component {

    state = {
        enteredUsername: '',
        enteredPassword: '',
        currentUserId: '',
        loggedIn: false
    }

    currentDashboard = `/dashboard/${this.state.currentUserId}`

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
        const verifiedUser = axios.post('/', currentUser)
        console.log(currentUser)
        if (verifiedUser) {
            const currentId = verifiedUser._id
            this.setState({currentUserId: currentId})
            this.getDashboard()
        } else {
            alert('Username/Password incorrect')
        }
    }

    getDashboard = () => {
        const logIn = true
        this.setState({loggedIn: logIn})
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ? <Redirect to={this.currentDashboard}></Redirect> : null}
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
                    <input
                        name="enteredPassword"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={this.onTextChange}
                        value={this.state.enteredPassword}
                    ></input>
                    <input type="submit" onClick={this.verifyData}></input>
                </form>
                </div>
            </div>
        )
    }
}
