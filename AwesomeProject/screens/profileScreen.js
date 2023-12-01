import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';

import MetamaskContext from '../context/metamask';

import '@ethersproject/shims';
import { ethers } from 'ethers';

import { myPallete } from '../components/colorPallete';

const meta = require('../assets/Metamask-icon.png')

const ProfileScreen = () => {

  const [metamaskCxt, setMetamaskCxt] = React.useContext(MetamaskContext);
  const [render, setRender] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const checkConection = async () => {
    if (!metamaskCxt.eth) {
      connect()
    }
  }

  const connect = async () => {

    setLoading(true)

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

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(ethereum);

    const balance = await provider.getBalance(
      ethereum.selectedAddress
    );

    const balanceInETH = ethers.formatEther(balance);

    const newContext = {
      eth: ethereum,
      address: accounts[0],
      provider: provider,
      balance: balanceInETH
    }

    setMetamaskCxt(newContext);
    setRender(!render)
    setLoading(false)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>Profile</Text>
      <TouchableOpacity disabled={metamaskCxt.address} onPress={() => checkConection()} style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderColor: metamaskCxt.address ? myPallete.mainGreen : myPallete.mainOrange, borderWidth: 0.7 }}>
        <Image resizeMode='contain' source={meta} style={{ width: 80, height: 80, borderRadius: 50 }} />
        {metamaskCxt.address ? (
          <>
            <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>{metamaskCxt.address}</Text>
            <Text style={{ fontSize: 14, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>{Math.round(metamaskCxt.balance * 10000) / 10000} eth</Text>
          </>
        ) : (
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500', marginTop: 10 }}>Connect to you MetaMask account</Text>
        )}
        {loading ? (
          <View style={{position: 'absolute', width: '100%', borderRadius: 20, backgroundColor: '#000000aa', height: '100%', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={myPallete.mainGreen}/>
          </View>
        ): undefined}
      </TouchableOpacity>
      <View style={{ width: 10, height: 100 }} />
    </ScrollView>
  );
};
export default ProfileScreen;