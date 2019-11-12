
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    state = {
        isAdmin: false
    }

    componentDidMount() {
        this.setState({isAdmin: this.props.isAdmin})
    }

    editProfile = `/dashboard/edit/${this.props.currentProfile}`
    returnToDashboard = `/dashboard/${this.props.currentProfile}`
    viewMessages = `/dashboard/messages/${this.props.currentProfile}`
    createUser = `/dashboard/createuser/${this.props.currentProfile}`

    checkIfAdmin = () => {
        if (this.props.isAdmin === true) {
            return (
                <Link className="navbar-option" to={this.editProfile}>
                    Create User
                </Link>
            )
        }
    }

    render() {

        return (
            <div className="navbar-container">
                <div className="navbar-items">
                    {this.props.isCreateUserPage
                    ? 
                        <Link className="navbar-option" to={this.returnToDashboard}>
                            Return to Dashboard
                        </Link>
                    :
                        <Link className="navbar-option" to={this.createUser}>
                            Create User
                        </Link>
                    }
                    {this.props.messagesPage === true
                    ? 
                        <Link className="navbar-option" to={this.returnToDashboard}>
                            Return to Dashboard
                        </Link>                    
                    :
                        <Link className="navbar-option" to={this.viewMessages}>
                            Messages
                        </Link>
                    }
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
