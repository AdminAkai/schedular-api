
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar.js'


export default class EditProfile extends Component {


    state = {
        _id: '',
        email: '',
        isAdmin: false,
        password:'',
        username: '',
        isEditPage: true
    }


    componentDidMount() {
        this.getEditProfileScreen()
    }

    onTextChange = (event) => {
        const previousData = { ...this.state }
        previousData[event.target.name] = event.target.value
        this.setState(previousData)
    }

    submitEdit = async (event) => {
        const editedUser = { ...this.state }
        await axios.put(`/api/dashboard/edit/${this.props.match.params.id}`, editedUser)
        alert('Profile Edited!')
        this.getEditProfileScreen()
    }

    getEditProfileScreen = async () => {
        const editScreen = await axios.get(`/api/dashboard/edit/${this.props.match.params.id}`)
        this.setState(editScreen.data)
    }


    render() {
        return (
            <div>
                <Navbar 
                    isEditPage={this.state.isEditPage} 
                    currentProfile={this.props.match.params.id}
                />
                <div className="edit-profile">
                    <h3>Current Profile</h3>
                    <form className="form">
                        <h4>Username</h4>
                        <input
                            onChange={this.onTextChange}
                            name="username"
                            type="string"
                            placeholder="New Username"
                        ></input>
                        <h4>Email</h4>
                        <input
                            onChange={this.onTextChange}
                            name="email"
                            type="string"
                            placeholder = "New Email"
                        ></input>
                        <h4>Change Password</h4>
                        <input
                            name="password"
                            onChange={this.onTextChange}
                            type="password"
                            placeholder="New Password"
                        ></input>
                        <input
                            className="submit"
                            type="submit"
                            value="Edit Profile"
                            onClick={this.submitEdit}
                        ></input>
                    </form>
                </div>
            </div>
        )
    }
}
