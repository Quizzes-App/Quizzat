import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from "react-native"
import axios from "axios"

export default class Register extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        score: 0,
        gold: 0,
        hint: 0,
        extraLife: 0,
        currentID: ""
    }

    updateCurrentInfo = () => {
        let currentID = this.state.currentID
        console.log(currentID)
        axios.put(`http://localhost:9000/updateCurrentInfo`, { currentID, status: "yes" })
            .then(response => {
                console.log(response.data)
            })
    }

    
    skip = () => {
        let currentID = this.state.currentID
        console.log(currentID)
        axios.put(`http://localhost:9000/updateCurrentInfo`, { currentID, status: "skip" })
            .then(response => {
                console.log(response.data)
            })
            this.props.navigation.navigate("Home")
    }

    registerUser = () => {
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let score = this.state.score
        let gold = this.state.gold
        let hint = this.state.hint
        let extraLife = this.state.extraLife

        let newUser = { name, email, password, score, gold, hint, extraLife }

        if (name == "" || email == "" || password == "") {
            console.log("Please Fill All Fields, All Fields Required")
        }
        else {
            axios.post(`http://localhost:9000/registerUser`, newUser)
                .then(response => {
                    let user = response.data
                    this.setState({ currentID: user._id })
                    this.updateCurrentInfo()
                    // console.log(response.data)
                    this.props.navigation.navigate("Home", { user_id: user._id })
                })
        }
    }

    render() {
        // console.log(this.state)
        return (
            <View style={style.page} >
                <Text>Register</Text>

                <TextInput
                    style={style.input} placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                />

                <TextInput
                    style={style.input} placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                />

                <TextInput
                    style={style.input} placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button title="Register"
                    onPress={this.registerUser}
                />
                <View style={style.switch}>
                    <Button
                        title="Have account? Login Now"
                        // onPress={this.props.navigation.navigate('Register')}
                        onPress={async () => await this.props.navigation.navigate("Login")}
                    />
                </View>

                
                <Button
                    title="Skip"
                    onPress={this.skip}
                />
            </View>

        )
    }
}

const style = StyleSheet.create({
    input: {
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    switch: {
        marginTop: 10
    },
    page: {
        marginTop: -280
    }
})
