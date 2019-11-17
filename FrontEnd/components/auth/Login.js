import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from "react-native"
import axios from "axios"

export default class Login extends Component {

    state = {
        email: "",
        password: "",
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
        // console.log(currentID)
        axios.put(`http://localhost:9000/updateCurrentInfo`, { currentID, status: "skip" })
            .then(response => {
                // console.log(response.data)
            })
            this.props.navigation.navigate("Home")
    }

    login = () => {
        let email = this.state.email
        let password = this.state.password

        if (email == "" || password == "") {
            console.log("Please Fill All Fields, All Fields Required")
        }
        else {
            axios.post(`http://localhost:9000/login`, { email, password })
                .then(response => {
                    let user = response.data
                    if (user == null) {
                        console.log("Email or Password is Incorrect, Please Try Again")
                        // ACTION IF EMAIL OR PASSWORD INCORRECT   
                    }
                    else {
                        this.setState({ currentID: user._id })
                        this.updateCurrentInfo()
                        this.props.navigation.navigate("Home")
                    }
                })
        }


    }



    render() {

        return (
            <View>
                <Text>Login</Text>

                <TextInput
                    style={style.input} placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}

                />

                <TextInput
                    style={style.input} placeholder="Name"
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    title="Login"
                    onPress={this.login}
                />

                <View style={style.switch}>
                    <Button
                        title="Don't have account? Register Now"
                        // onPress={this.props.navigation.navigate('Register')}
                        onPress={async () => await this.props.navigation.navigate("Register")}
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
    }
})