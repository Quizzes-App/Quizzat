import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"
import axios from "axios"

export default class Landing extends Component {

    UNSAFE_componentWillMount() {
        this.getCurrentInfo()
    }

    getCurrentInfo = () => {
        axios.get(`http://localhost:9000/getCurrentInfo`)
            .then(response => {
                // console.log(response.data)
                let status = response.data.status
                // let currentID = response.data.currentId
                if (status === "no") {
                    this.props.navigation.navigate('Login')
                }
                else if (status === "yes" || status === "skip") {
                    this.props.navigation.navigate('Home')
                }
            })
    }

    render() {

        return (
            <View>
            </View>
        )
    }
}
