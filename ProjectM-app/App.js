// dependencies
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

// screens
import NewBetScreen from "./screens/newBetScreen";
import HomeScreen from "./screens/homeScreen";
import ProfileScreen from './screens/profileScreen';

const Tabs = AnimatedTabBarNavigator();

export default () => (
  <NavigationContainer theme={{ colors: { background: '#1A1917' } }}>
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#fff",
        activeBackgroundColor: "#2a2926",
      }}
      appearance={{
        tabBarBackground: '#3e3d38',
        dotCornerRadius: 10,
        dotSize: 'small',
      }}
    >

      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="home"
              color={'#fff'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="New Bet"
        component={NewBetScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name="number"
              color={'#fff'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person-circle-outline"
              color={'#fff'}
            />
          )
        }}
      />

    </Tabs.Navigator>
  </NavigationContainer>
)