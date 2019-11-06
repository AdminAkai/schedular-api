
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    state = {
        message: ''
    }

    editProfile = `/dashboard/edit/${this.props.currentProfile}`

    render() {
        return (
            <div>
                <div>
                    <Link to={this.editProfile}>Edit Profile</Link>
                    <Link to='/'>Logout</Link>
                </div>
            </div>
        )
    }
}
