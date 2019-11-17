import { createStackNavigator, createAppContainer, Header } from 'react-navigation';
import Navbar from './menu/Navbar';
import Profile from './menu/Profile';
import Leaderboard from './menu/Leaderboard';
import Store from './menu/Store';
import Setting from './menu/Setting';
import Landing from './screen/Landing';
import Head from './screen/Head';
import Home from './screen/Home';
import Quiz from "./screen/Quiz";
import Register from "./auth/Register";
import Login from './auth/Login';
import logout from './menu/logout';


const navigator = createStackNavigator(
    {
        Navbar: Navbar,
        Profile: Profile,
        Leaderboard: Leaderboard,
        Store: Store,
        Setting: Setting,
        Landing: Landing,
        Head: Head,
        Home: Home,
        Quiz: Quiz,
        Register: Register,
        Login: Login,
        Logout: logout
    },
    {
        initialRouteName: "Landing",
        defaultNavigationOptions: {
            title: "Landing"
        }
    }
);
export default createAppContainer(navigator);
