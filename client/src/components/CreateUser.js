
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

export default class HelloWorld extends Component {


    state = {
        createUserPage: true,
        newUsername: "",
        newPassword: "",
        newEmail: "",
        newAvailability: 0,
        newIsAdmin: false,
        isAdmin: false
    }


    componentDidMount() {
        this.setUser()
    }

    setUser = async () => {
        const currentUser = await axios.get(`/api/getusers/${this.props.match.params.id}`) 
        const currentUserInfo = {
            isAdmin: currentUser.data.isAdmin
        }
        this.setState(currentUserInfo)
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    submitNewUser = async (event) => {
        event.preventDefault()
        const newUser = { 
            username: this.state.newUsername,
            password: this.state.newPassword,
            email: this.state.newEmail,
            availability: this.state.newAvailability,
            isAdmin: this.state.newIsAdmin
        }
        await axios.post(`/api/createuser/`, newUser)
        alert('Profile created!')
    }

    render() {
        return (
            <div>
                <Navbar 
                    currentProfile={this.props.match.params.id} 
                    isCreateUserPage={this.state.createUserPage} 
                    isAdmin={this.state.isAdmin}
                />
                <form className="form">
                    <h3>New Username</h3>
                    <input
                        type="text"
                        name="newUsername"
                        onChange={this.onTextChange}
                        value={this.state.newUsername}
                    ></input>
                    <h3>New Password</h3>
                    <input
                        type="password"
                        name="newPassword"
                        onChange={this.onTextChange}
                        value={this.state.newPassword}
                    ></input>
                    <h3>New Email</h3>
                    <input
                        type="text"
                        name="newEmail"
                        onChange={this.onTextChange}
                        value={this.state.newEmail}
                    ></input>
                    <h3>Availability (Total Work Hours in 7 Day Week)</h3>
                    <input
                        type="number"
                        name="newAvailability"
                        onChange={this.onTextChange}
                        value={this.state.newAvailability}
                    ></input>
                    <h3>Admin</h3>
                    <select name="newIsAdmin">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <input
                        type="submit"
                        value="Create User"
                        onClick={this.submitNewUser}
                    ></input>
                </form>
            </div>
        )
    }
}
