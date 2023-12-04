import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {Image} from 'react-native';

// screens
import HomeScreen from './screens/homeScreen';
import NewBetScreen from './screens/newBetScreen';
import ProfileScreen from './screens/profileScreen';

import MetamaskContext from './context/metamask';

const home = require('./assets/home.png');
const numbers = require('./assets/numbers.png');
const user = require('./assets/user.png');

const Tabs = AnimatedTabBarNavigator();

export default () => {
  const metamaskHook = React.useState('');

  return (
    <NavigationContainer theme={{colors: {background: '#1A1917'}}}>
      <MetamaskContext.Provider value={metamaskHook}>
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#2a2926',
          }}
          appearance={{
            tabBarBackground: '#3e3d38',
            dotCornerRadius: 10,
            dotSize: 'small',
          }}>
          <Tabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  resizeMode="contain"
                  source={home}
                  style={{width: 20, height: 20}}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="New Bet"
            component={NewBetScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  resizeMode="contain"
                  source={numbers}
                  style={{width: 20, height: 20}}
                />
              ),
            }}
          />
          {/* <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Image
                  resizeMode="contain"
                  source={user}
                  style={{width: 20, height: 20}}
                />
              ),
            }}
          /> */}
        </Tabs.Navigator>
      </MetamaskContext.Provider>
    </NavigationContainer>
  );
};
