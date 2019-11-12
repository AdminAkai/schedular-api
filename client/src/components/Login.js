
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {

    state = {
        enteredUsername: '',
        enteredPassword: '',
        currentUserId: '',
        loggedIn: false
    }

    currentDashboard = `/dashboard/${this.state.currentUserId}`

    componentDidMount() {
        this.seedAdminData()
    }

    seedAdminData = async () => {
        const adminExist = await axios.get('/api/getadmin/')
        if (adminExist.data[0]) {
            console.log('Admin account exists')
        } else {
            const Admin = {
                username: 'admin',
                password: 'admin',
                email: 'admin@admin.com',
                isAdmin: true
            }
            await axios.post('/api/createuser/', Admin)
        }
    }

    renderRedirect = () => {
        if (this.state.loggedIn) {
            return <Redirect to={this.currentDashboard}></Redirect>
        }
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        console.log(`${event.target.name}: ${event.target.value}`)
        this.setState(previousData)
    }

    verifyData = async (event) => {
        event.preventDefault()
        const currentUser = {
            username: this.state.enteredUsername,
            password: this.state.enteredPassword
        }
        const verifiedUser = await axios.post('/verify', currentUser)
        console.log(verifiedUser)
        console.log(verifiedUser.data._id)
        if (verifiedUser.data !== 'error') {
            this.setState({currentUserId: verifiedUser.data._id}, () => {
                this.currentDashboard = `/dashboard/${this.state.currentUserId}`
                this.setState({loggedIn: true})
            })
        } else {
            alert('Username/Password Incorrect')
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1 className="schedular text-shadow">SCHEDUL&lambda;R</h1>
                <div className="login animated animatedFadeInUp fadeInUp">
                    <form className="form shadow">
                        <h4>Username</h4>
                        <input
                            className="username"
                            name="enteredUsername"
                            type="string"
                            placeholder="Username"
                            required
                            onChange={this.onTextChange}
                            value={this.state.enteredUsername}
                        ></input>
                        <h4>Password</h4>
                        <input
                            className="password"
                            name="enteredPassword"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={this.onTextChange}
                            value={this.state.enteredPassword}
                        ></input>
                        <input
                            className="submit" 
                            type="submit" 
                            onClick={this.verifyData} 
                            value="Login"
                        ></input>
                    </form>
                </div>
            </div>
        )
    }
}
