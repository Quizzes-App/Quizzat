
import React from "react";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Navigator from "./components/Navigator";

import Login from "./components/auth/Login";
import Logout from "./components/menu/Logout";
import Register from "./components/auth/Register";
import Profile from "./components/menu/Profile";
import Setting from "./components/menu/Setting";
// import Icon from 'react-native-vector-icons/FontAwesome';
import Leaderboard from './components/menu/Leaderboard';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class HomeScreen extends React.Component {
  state = {
    host: "192.168.6.106",
    users: {},
    user: {},
    storeItems: []
  };

  render() {
    return (
      <View
        style={{ flex: 15, justifyContent: "center", alignItems: "center" }}
      >
        <View>
          <Navigator />
        </View>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintcolor }) => <Icon name="home" size={24} />
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintcolor }) => <Icon name="face-profile" size={24} />
    }
  },
  Register: {
    screen: Logout,
    navigationOptions: {
      tabBarLabel: "Logout",
      tabBarIcon: ({ tintcolor }) => <Icon name="settings" size={24} />
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: "login",
      tabBarIcon: ({ tintcolor }) =>
        <Icon name="login-variant" size={24} />

    }
  },
  Leaderboard: {
    screen: Leaderboard,
    navigationOptions: {
      tabBarLabel: "Leaderboard",
      tabBarIcon: ({ tintcolor }) =>
        <Icon name="clipboard-account" size={24} />

    }
  }
});

export default createAppContainer(TabNavigator);
