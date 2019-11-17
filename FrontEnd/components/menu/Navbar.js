// INCLUDE ADDING INVITE & SHARE BUTTONS
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableView } from 'react-native';

import Profile from "./Profile"
import Setting from "./Setting"
import Leaderboard from "./Leaderboard"
import Store from "./Store"

const Navbar = (props) => {

    return (
        <View style={styles.navbarStyle}>
            <Text>Navbar</Text>

            <View style={styles.buttonStyle}>
                <Button
                    title="Profile"
                    onPress={() => props.navigation.navigate("Profile", {name: 'ahmad'})}
                />
            </View>

            <View style={styles.buttonStyle}>
                <Button
                    title="Leaderboard"
                    onPress={() => props.navigation.navigate("Leaderboard")}
                />
            </View>

            <Setting />

            <View style={styles.buttonStyle}>
                <Button
                    title="Store"
                    onPress={() => props.navigation.navigate("Store")}
                />
            </View>

        </View>
    )

}
export default Navbar

const styles = StyleSheet.create({
    navbarStyle: {
        width: 300,
        margin: "auto",
    },
    buttonStyle: {
        marginTop: 10,
        width: "50%"
    },
})