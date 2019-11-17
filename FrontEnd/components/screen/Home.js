import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"
import axios from "axios"

export default class Home extends Component {

    state = {
        host: "10.60.243.108",
        user: {},
        questions: [],
        correctAnswer: "",
        quetionsSolved: 0,
        lives: 3,
        _id: ""
    }

    UNSAFE_componentWillMount = async () => {
        await this.getCurrentInfo()
        await this.getUser();
    }
    getCurrentInfo = async () => {
        await axios.get(`http://localhost:9000/getCurrentInfo`)
            .then(response => {
                this.setState({ _id: response.data.currentId })
            })
    }


    getUser = () => {
        let _id = this.state._id
        axios.post(`http://localhost:9000/getLoggedInUser`, { _id })
            .then(response => {
                let user = response.data;
                this.setState({ user })
            })
    }

    // logout
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
            < View >
                <View>
                    <Text>
                        {this.state.user.name}
                    </Text>
                </View>
                < View >
                    <Text>Home</Text>
                    <Button title="IT"
                        onPress={() => this.props.navigation.navigate("Quiz", { field: "IT", user: this.state.user })} />
                    <Button title="Medical"
                        onPress={() => this.props.navigation.navigate("Quiz", { field: "Medical", user: this.state.user })} />
                    <Button title="Culture"
                        onPress={() => this.props.navigation.navigate("Quiz", { field: "Culture", user: this.state.user })} />
                    <Button title="Science"
                        onPress={() => this.props.navigation.navigate("Quiz", { field: "Science", user: this.state.user })} />
                </View >

                <View>
                    <Button
                        title="Logout"
                        onPress={this.logout}
                    />
                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    question: {
        marginTop: 20
    },
    answers: {
        marginTop: 20
    }

})









// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "Every number system has a base, which is called __________.",
//             answer: [{
//                 option1: "Index",
//                 option2: "Subscript",
//                 option3: "Radix",
//                 option4: "NON of the above",

//             }],
//             correctIndex: "option3"
//         }]
// },
// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "Which of the following software is used to view web pages?",
//             answer: [{
//                 option1: "Web Browsers",
//                 option2: "Internet Browser",
//                 option3: "Page Browser",
//                 option4: "All of the above",

//             }],
//             correctIndex: "option1"
//         }]
// },
// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "________________ is the process in which a user sends computer information from his computer to another computer through modem.",
//             answer: [{
//                 option1: "Downloading",
//                 option2: "Uploading",
//                 option3: "All the above",
//                 option4: "NON of the above",

//             }],
//             correctIndex: "option2"
//         }]
// },





















