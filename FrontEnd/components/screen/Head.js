import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from "react-native"


const Head = (props) => {

    return (
        <View style={styles.head} >
            <Text>Head</Text>

            <View >
                <Button
                    title="Navbar"
                    onPress={() => props.navigation.navigate("Navbar")}
                />
            </View>
        </View>
    )
}

export default Head

const styles = StyleSheet.create({
    head: {
        marginTop: 100
    }
})