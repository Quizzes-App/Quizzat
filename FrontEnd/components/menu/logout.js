import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"
import axios from "axios"


export default class logout extends Component {

    UNSAFE_componentWillMount() {
        this.logout()
    }

    logout = () => {
        console.log("Logout")
        axios.put(`http://localhost:9000/logout`)
            .then(response => {
                console.log(response.data)
                this.props.navigation.navigate("Login")
            })
    }



    render() {
        return (
            <View>
            </View>
        )
    }
}

