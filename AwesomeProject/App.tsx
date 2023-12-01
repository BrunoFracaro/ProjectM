// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import MetaMaskSDK from '@metamask/sdk';
// import BackgroundTimer from 'react-native-background-timer';

// import '@ethersproject/shims';
// import {ethers} from 'ethers';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const [eth, setEth]: any = React.useState();

//   React.useEffect(() => {
//     const exec = async () => {
//       console.log('restart');
//       const MMSDK = new MetaMaskSDK({
//         openDeeplink: link => {
//           Linking.openURL(link); // Use React Native Linking method or another way of opening deeplinks.
//         },
//         timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
//         dappMetadata: {
//           name: 'My dapp', // The name of your dapp.
//           url: 'https://mydapp.com', // The URL of your website.
//         },
//       });

//       await MMSDK.init();

//       const ethereum = MMSDK.getProvider();
//       setEth(ethereum);
//     };

//     exec();
//   }, []);

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const connect = async () => {
//     console.log('1111111111111');
//     const accounts = await eth.request({method: 'eth_requestAccounts'});

//     console.log({accounts});
//   };

//   const getBalance = async () => {
//     console.log('667', eth);

//     const provider = new ethers.BrowserProvider(eth);

//     // const provider = new ethers.JsonRpcProvider(
//     //   'https://eth-goerli.g.alchemy.com/v2/fimlv4n0QGOOIbJKbIqTz6y-Pa4wIgIt',
//     // );

//     console.log({provider});

//     const balance = await provider.getBalance(
//       '0x1010782fB6318757c19fe320310582A119Cf5857',
//     );

//     console.log({balance});

//     const balanceInETH = ethers.formatEther(balance);

//     console.log({balanceInETH});
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             <TouchableOpacity onPress={() => connect()}>
//               <Text style={styles.highlight}>Connect</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => getBalance()}>
//               <Text style={styles.highlight}>...........Get Balance</Text>
//             </TouchableOpacity>
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// dependencies
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
          <Tabs.Screen
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
          />
        </Tabs.Navigator>
      </MetamaskContext.Provider>
    </NavigationContainer>
  );
};
