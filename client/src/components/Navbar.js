
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    state = {
        default: ''
    }

    editProfile = `/dashboard/edit/${this.props.currentProfile}`
    returnToDashboard = `/dashboard/${this.props.currentProfile}`
    viewMessages = `/dashboard/messages/${this.props.currentProfile}`

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-items">
                    <Link className="navbar-option" to={this.viewMessages}>Messages</Link>
                    {this.props.isEditPage === true
                    ? 
                        <Link className="navbar-option" to={this.returnToDashboard}>
                            Return to Dashboard
                        </Link>
                    :
                        <Link className="navbar-option" to={this.editProfile}>
                            Edit Profile
                        </Link>
                    }
                    <Link className="navbar-option" to='/'>Logout</Link>
                </div>
            </div>
        )
    }
}
