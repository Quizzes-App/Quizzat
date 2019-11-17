import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"
import axios from "axios"
// import Prompt from "react-native-prompt"

export default class Quiz extends Component {

    state = {
        field: "",
        user: {},
        questions: [],
        correctAnswer: "",
        lives: 3,
        _id: "",
        win: "no"
    }


    UNSAFE_componentWillMount = async () => {
        await this.getCurrentInfo()
        await this.getUser()
    }

    componentDidMount = async () => {
        await this.getField();
        await this.getQuestions();
    }



    getField = async () => {
        let field = this.props.navigation.getParam("field")
        await this.setState({ field })

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


    getQuestions = () => {
        let field = this.state.field
        axios.post(`http://localhost:9000/getQuestions`, { field })
            .then(response => {
                let questions = response.data
                this.setState({ questions })
                let correctAnswer = this.state.questions[0].correctAnswer
                this.setState({ correctAnswer })
            })
    }




    validateAnswer = answer => {
        let _id = this.state.user._id
        let score = this.state.user.score
        let gold = this.state.user.gold
        let lives = this.state.lives
        let correctAnswer = this.state.correctAnswer
        let questions = this.state.questions

        if (answer == correctAnswer) {
            console.log("ANSWER IS CORRECT")
            axios.post(`http://localhost:9000/validateAnswer`, { _id, score, gold })
                .then(response => {
                    console.log(response.data)
                })

            if (questions.length === 1) {
                console.log("You are Winner ");
                this.setState({ win: "yes" })
                this.props.navigation.navigate('Home');

            }
            else {
                questions.shift()
                this.setState({ questions })
                this.setState({ correctAnswer: questions[0].correctAnswer })
            }
        }

        // WRONG
        else {
            if (questions.length !== 1) {
                console.log("Wrong Answer")
                this.setState({ lives: lives - 1 })
                if (lives !== 1) {
                    questions.shift()
                    this.setState({ questions })
                    this.setState({ correctAnswer: questions[0].correctAnswer })
                }
                else {
                    console.log("You are Noob >-< ");
                    // alert("Buy Extra Lives ?")
                    this.props.navigation.navigate("Home")

                }
            }

            else {
                // فاز
                console.log("You are Winner ");
                this.setState({ win: "yes" })
                this.props.navigation.navigate("Home")
            }
        }

    }


    levelComplete = () => {
        let _id = this.state.user._id
        let score = this.state.user.score
        axios.post(`http://localhost:9000/levelComplete`, { _id, score })
    }

    render() {

        {
            if (this.state.win === "yes") {
                this.levelComplete()
            }
        }



        // console.log(this.state.user)
        const { questions, lives, quetionsSolved } = this.state


        if (questions.length === 0) {
            return null
        } else {
            return (

                <View>
                    <Text>Quiz</Text>
                    <View>
                        <Text>{questions[0].question}</Text>
                        <Button
                            onPress={() => this.validateAnswer("option1")}
                            title={questions[0].answers.option1} />

                        <Button
                            onPress={() => this.validateAnswer("option2")}
                            title={questions[0].answers.option2} />

                        <Button
                            onPress={() => this.validateAnswer("option3")}
                            title={questions[0].answers.option3} />

                        <Button
                            onPress={() => this.validateAnswer("option4")}
                            title={questions[0].answers.option4} />
                    </View>
                </View>

            )
        }
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



