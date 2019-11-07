
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

    getEditProfileScreen = async () => {
        const editScreen = await axios.get(`/api/dashboard/edit/${this.props.match.params.id}`)
        this.setState(editScreen.data)
    }


    render() {
        return (
            <div className="component-container">
                <Navbar isEditPage={this.state.isEditPage} currentProfile={this.props.match.params.id}/>
                <div className="edit-profile">
                    <h3>Current Profile</h3>
                    <form>
                        <h4>Username</h4>
                        <input
                            type="text"
                            name="username"
                            required
                        ></input>
                        <h4>Email</h4>
                        <input
                            type="text"
                            name="email"
                            required
                        ></input>
                        <h4>Change Password</h4>
                        <input
                            type="password"
                            name="password"
                            required
                        ></input>
                        <input
                            type="submit"
                            value="Edit Profile"
                        ></input>
                    </form>
                    <h4>{this.state.username}</h4>
                </div>
            </div>
        )
    }
}
