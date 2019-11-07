
import React, { Component } from 'react'
import axios from 'axios'


export default class EditProfile extends Component {


    state = {
        isEditPage: true
    }


    componentDidMount() {
        axios.get('/api/helloworld')
            .then((res) => {
                this.setState({message: res.data})
            })
    }


    render() {
        return (
            <div>
                <div></div>
            </div>
        )
    }
}
