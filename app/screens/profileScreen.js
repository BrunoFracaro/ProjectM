import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import singletonSDKInstance from '../web3/mmsdk';

import MetamaskContext from '../context/metamask';

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

    const accounts = await singletonSDKInstance.getUser()

    const balance = await singletonSDKInstance.getBalance()

    const check = await singletonSDKInstance.totalInContract()

    console.log({check})

    const newContext = {
      address: accounts[0],
      balance: balance,
    }

    setMetamaskCxt(newContext);
    setRender(!render)
    setLoading(false)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>Profile</Text>
      <TouchableOpacity onPress={() => checkConection()} style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderColor: metamaskCxt.address ? myPallete.mainGreen : myPallete.mainOrange, borderWidth: 0.7 }}>
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