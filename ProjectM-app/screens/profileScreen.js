import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
// import "react-native-get-random-values"
// import "@ethersproject/shims"
// import { ethers } from "ethers";

import { myPallete } from '../components/colorPallete';
import { ethereum } from '../web3/metamask';

const meta = require('../assets/Metamask-icon.png')

const ProfileScreen = () => {

  const [user, setUser] = React.useState()
  const [balance, setBalance] = React.useState()

  const connect = async() => {
    
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setUser(accounts[0])

    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const balance = await provider.getBalance(ethereum.selectedAddress);
    // const balanceInETH = ethers.utils.formatEther(balance);
    // setBalance(balanceInETH)
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