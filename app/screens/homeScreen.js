import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import {GOERLI_URL} from "react-native-dotenv"

import '@ethersproject/shims';
import { ethers } from 'ethers';

import { myPallete } from '../components/colorPallete';

const ether = require('../assets/ether2.jpg')
const ethereum = require('../assets/ethereum.png')
const bayc = require('../assets/bayc2.jpg')


function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function nextDay(x) {
  const now = new Date();
  now.setDate(now.getDate() + (x + (7 - now.getDay())) % 7);
  return now;
}

const HomeScreen = () => {

  const [balance, setBalance] = React.useState('')
  const [currency, setCurrency] = React.useState(0)
  const [clock, setClock] = React.useState('')

  React.useEffect(() => {

    const getBalance = async () => {

      const provider = new ethers.JsonRpcProvider(
        'https://eth-goerli.g.alchemy.com/v2/fimlv4n0QGOOIbJKbIqTz6y-Pa4wIgIt',
      );

      console.log({ provider });

      const balance = await provider.getBalance(
        '0x9b0164272ca6744eb66d8508191Ff6fAA8475b1a',
      );

      console.log({ balance });

      const balanceInETH = ethers.formatEther(balance);

      setBalance( balanceInETH );
    }

    getBalance()
    arrangeCurrency()
  }, [])

  useInterval(() => {
    arrangeClock()
  }, 1000);

  const arrangeCurrency = () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
      .then((response) =>response.json())
      .then((responseJson) =>{
        console.log('responseJson', responseJson);
        setCurrency(responseJson.USD)
      })
  }

  const arrangeClock = () => {
    const now = new Date()
    const sunday = nextDay(7)
    sunday.setHours(23)
    sunday.setMinutes(59)
    sunday.setSeconds(59)
    const diffMs = (sunday - now) / 1000
    const days = Math.floor(diffMs / 86400)
    const hours = Math.floor((diffMs % 86400) / 3600)
    const minutes = Math.round(((diffMs % 86400) % 3600) / 60)
    const seconds = Math.round(((diffMs % 86400) % 3600) % 60)
    if (seconds > 29) {
      const newClock = { d: days, h: hours, m: (minutes - 1), s: seconds }
      setClock(newClock)
    } else {
      const newClock = { d: days, h: hours, m: minutes, s: seconds }
      setClock(newClock)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>ProjectM</Text>
      <Text style={{ color: myPallete.mainGreen, fontSize: 20, marginLeft: 20, marginTop: 10 }}>Blockchain backed, 100% transparent lottery</Text>
      <View style={{ marginTop: 14, justifyContent: 'center' }}>
        <Image resizeMode='contain' source={ether} style={{ width: '95%', height: 300, alignSelf: 'center', borderRadius: 20, borderColor: myPallete.mainGreen, borderWidth: 0.7 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute' }}>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Total in contract</Text>
          <View style={{ marginTop: 10, backgroundColor: '#bbbbbbaa', width: 300, paddingVertical: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }}>{Math.round(balance * 10000) / 10000}</Text>
            <Image resizeMode='contain' source={ethereum} style={{ width: 20, height: 20 }} />
          </View>
          <Text style={{ fontSize: 16, color: '#eee', fontWeight: '500' }}>{Math.round(balance*currency*100)/100} USD</Text>
          <Text style={{ fontSize: 20, color: '#eee', fontWeight: '500', marginTop: 20 }}>Next draw in {clock.d}d, {clock.h}h, {clock.m}m, {clock.s}s</Text>
        </View>
      </View>
      <View style={{ marginTop: 14, justifyContent: 'center' }}>
        <Image resizeMode='contain' source={bayc} style={{ width: '95%', height: 200, alignSelf: 'center', borderRadius: 20, borderColor: myPallete.mainOrange, borderWidth: 0.7 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute' }}>
          <View style={{ marginTop: 10, backgroundColor: '#bbbbbbaa', width: 300, paddingVertical: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18 }}>NFT draws comming soon...</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Need some help?</Text>
        <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500', marginLeft: 8, marginTop: 10 }}>In ProjectM you can place your bets throught your smartphone with the app, or through the website with one of the supported bowsers.</Text>
        <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500', marginLeft: 8, marginTop: 10 }}>The draw occours every Sunday 11:55 PM ET, and the winner recieve the prize automatically in your Metamask account.</Text>
        <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500', marginLeft: 8, marginTop: 10 }}>Open the "Help" tab to get instructions on how to place your bets</Text>
      </View>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Previous Winners</Text>
        <View style={{ marginTop: 20, flexDirection: 'row', marginLeft: 10 }} >
          <View style={{ alignItems: 'center' }} >
            <View style={{ width: 14, height: 14, borderRadius: 20, backgroundColor: myPallete.mainGreen }} />
            <View style={{ width: 1, height: 50, backgroundColor: '#fff', marginTop: 10 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500', marginLeft: 14 }}>0x101744452287...</Text>
            <Text style={{ fontSize: 14, color: '#aaa', marginLeft: 14, marginTop: 10 }}>26/11/2023</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#aaa', marginLeft: 14, marginTop: 10 }}>14.25 eth</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', marginLeft: 10 }} >
          <View style={{ alignItems: 'center' }} >
            <View style={{ width: 14, height: 14, borderRadius: 20, backgroundColor: myPallete.mainGreen }} />
            <View style={{ width: 1, height: 50, backgroundColor: '#fff', marginTop: 10 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500', marginLeft: 14 }}>0x101744452287...</Text>
            <Text style={{ fontSize: 14, color: '#aaa', marginLeft: 14, marginTop: 10 }}>19/11/2023</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#aaa', marginLeft: 14, marginTop: 10 }}>10.25 eth</Text>
        </View>
      </View>
      <View style={{ width: 10, height: 100 }} />
    </ScrollView>
  );
};
export default HomeScreen;