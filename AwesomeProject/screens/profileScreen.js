import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';

import '@ethersproject/shims';
import {ethers} from 'ethers';

import { myPallete } from '../components/colorPallete';

const meta = require('../assets/Metamask-icon.png')

const ProfileScreen = () => {

  const [user, setUser] = React.useState('')
  const [balance, setBalance] = React.useState('')

  const [eth, setEth] = React.useState();

  React.useEffect(() => {
    const exec = async () => {
      console.log('restart');
      const MMSDK = new MetaMaskSDK({
        openDeeplink: link => {
          Linking.openURL(link); // Use React Native Linking method or another way of opening deeplinks.
        },
        timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
        dappMetadata: {
          name: 'My dapp', // The name of your dapp.
          url: 'https://mydapp.com', // The URL of your website.
        },
      });

      await MMSDK.init();

      const ethereum = MMSDK.getProvider();
      setEth(ethereum);
    };

    exec();
  }, []);

  const connect = async() => {
    const accounts = await eth.request({method: 'eth_requestAccounts'});

    setUser(accounts[0])

    const provider = new ethers.BrowserProvider(eth);

    const balance = await provider.getBalance(
      'https://eth-goerli.g.alchemy.com/v2/fimlv4n0QGOOIbJKbIqTz6y-Pa4wIgIt',
    );

    const balanceInETH = ethers.formatEther(balance);

    setBalance({balanceInETH});
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>Profile</Text>
      <TouchableOpacity onPress={() =>connect()} style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderColor: user ? myPallete.mainGreen : myPallete.mainOrange, borderWidth: 0.7 }}>
        <Image resizeMode='contain' source={meta} style={{ width: 80, height: 80, borderRadius: 50 }} />
        {user ? (
          <>
            <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>{user}</Text>
            <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>{balance} eth</Text>
          </>
        ): (
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>Connect to you MetaMask account</Text>
        )}
      </TouchableOpacity>
      <View style={{ width: 10, height: 100 }} />
    </ScrollView>
  );
};
export default ProfileScreen;