import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';

export default class Store extends Component {

    state = {
        host: "10.60.243.108",
        user: {},
        storeItems: [],
    }

    componentDidMount() {
        this.getStoreItems();
        this.getUser();
    }

    getStoreItems = () => {
        axios.get(`http://localhost:9000/getStoreItems`)
            .then(response => {
                this.setState({ storeItems: response.data })
            })
    }

    getUser = () => {
        axios.get(`http://localhost:9000/getLoggedInUser`)
            .then(response => {
                let user = response.data
                this.setState({ user });
            })
    }


    buyItem = item => {

        let _id = this.state.user._id
        let itemName = item.name
        let gold = this.state.user.gold
        let cost = item.cost
        let hintHave = this.state.user.hint
        let extraLifeHave = this.state.user.extraLife
        console.log("ITEMS HAVE BEFORE BUY", hintHave, extraLifeHave)

        if (gold >= cost) {
            let goldAfterBuy = gold - cost
            if (itemName === "Hint") {
                let hintHave = this.state.user.hint + 1
                let extraLifeHave = this.state.user.extraLife
                console.log("Hint HAVE AFTER BUY", { hintHave, extraLifeHave })
                axios.post(`http://localhost:9000/updateOwenedItes`, { _id, goldAfterBuy, itemName, hintHave, extraLifeHave })
                this.getUser()
            }
            else if (itemName === "Extra Life") {
                let hintHave = this.state.user.hint
                let extraLifeHave = this.state.user.extraLife + 1
                console.log("EXTRA LIFE HAVE AFTER BUY", hintHave, extraLifeHave)
                axios.post(`http://localhost:9000/updateOwenedItes`, { _id, goldAfterBuy, itemName, hintHave, extraLifeHave })
                this.getUser()
            }
        }
        else {
            console.log("YOU DONT HAVE COST, BUY NOW")
        }
    }


    render() {
        const { storeItems } = this.state

        return (
            <View>
                <Text>Store</Text>
                {/* <Text>`YOU HAVE GOLD : {this,state.user.gold}`</Text> */}
                {
                    storeItems.map(item => {
                        return (
                            <Button
                                key={item._id}
                                title={`${item.name} ${item.cost}`}
                                style={styles.itemStyle}
                                onPress={() => this.buyItem(item)}
                            >
                                {/* <TouchableOpacity> */}
                                {/* <Text>{item.name}</Text> */}
                                {/* <Text>{item.cost}</Text> */}
                                {/* </TouchableOpacity> */}

                            </Button>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        marginTop: 10
    }
})




// db.getCollection('users').insertMany([{
//     name: "Mohammad Alaa Aldein",
//     email: "mohammad@gmail.com",
//     socre: 2000,
//     gold: 200,
//     itemsHave: [
//         {
//             name: "Hint",
//             number: 0
//         },
//         {
//             name: "Extra Life",
//             number: 0
//         }
//     ]
// }])