import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from "axios"


export default class Leaderboard extends Component {

    state = {
        users: [],
        host: "192.168.6.106"
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        axios.get(`http://localhost:9000/getUsers`)
            .then(response => {
                let users = response.data
                this.setState({ users });
            })
    }

    render() {
        return (
            <View>
                <Text>Leaderboard</Text>
                {
                    this.state.users.map(user => {
                        return (
                            <View key={user._id} style={{ flexDirection: "row" }}>
                                <Text> {user.name} </Text>
                                <Text> {user.score} </Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}