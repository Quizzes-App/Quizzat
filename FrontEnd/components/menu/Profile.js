import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from "axios"

export default class Profile extends Component {


    state = {
        user: {},
        _id: null,
        name: null,
        email: null,
        socre: null,
        gold: null,
        itemsHave: {},

        host: "192.168.6.106",
        currentId: ""
    }

    UNSAFE_componentWillMount = async () => {
        await this.getCurrentInfo()
        await this.getUser()
    }

    getCurrentInfo = async () => {
        await axios.get(`http://localhost:9000/getCurrentInfo`)
            .then(response => {
                this.setState({ currentId: response.data.currentId })
                console.log(this.state.currentId)
            })
    }



    getUser = async () => {
        let _id = this.state.currentId
        console.log(_id)
        await axios.post(`http://localhost:9000/getLoggedInUser`, { _id })
            .then(response => {
                let user = response.data;
                this.setState({ user })
                console.log(this.state.user)
            })
    }


    // UPDATE USER
    updateUser = () => {
        let _id = this.state.currentId
        let name = this.state.name
        let email = this.state.email
        let score = this.state.score
        let gold = this.state.gold
        let user = { _id, name, email, score, gold }
        axios.post(`http://localhost:9000/updateUser`, user)
    }

    render() {

        return (
            <View>
                <Text>Profile</Text>

                {/* NAME */}
                <TextInput
                    onChangeText={(name) => {
                        this.setState({
                            name
                        })
                    }}
                    defaultValue={this.state.user.name}
                    style={styles.TextInput}
                />

                {/* EMAIL */}
                <TextInput onChangeText={(email) => {
                    this.setState({
                        email
                    })
                }}
                    defaultValue={this.state.user.email}
                    style={styles.TextInput}
                />


                <Button title="Update"
                    onPress={this.updateUser} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TextInput: {
        padding: 2,
        borderColor: "black",
        borderWidth: 1
    }
})


// db.getCollection('users').insertMany([
//     {
//         name: "Abeer Jaafreh",
//         email: "abeer@gmail.com",
//         password: "12345",
//         score: "2500",
//         gold: "150"
//     },
//     {
//         name: 'Mohammad Alaa Aldein',
//         email: "mohamamd@gmail.com",
//         password: "12345",
//         score: "2000",
//         gold: "100"
//     },
//     {
//         name: "Raghad",
//         email: "raghad@gmail.com",
//         password: "12345",
//         score: "1800",
//         gold: "120"
//     },
//     {
//         name: 'Ahmad Taha',
//         email: "ahmad@gmail.com",
//         password: "12345",
//         score: "1700",
//         gold: "180"
//     }
// ])