import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Image, Linking } from 'react-native';
import {GOERLI_URL} from "react-native-dotenv"

import '@ethersproject/shims';
import { ethers } from 'ethers';

import singletonSDKInstance from '../web3/mmsdk';

import MetamaskContext from '../context/metamask';

const meta = require('../assets/Metamask-icon.png')

import { myPallete } from '../components/colorPallete';

const heart = require('../assets/heartGreen.png')
const trash = require('../assets/trash.png')

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

const NewBetScreen = () => {

  const [numbers, setNumbers] = React.useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
  ])

  const [modal, setModal] = React.useState(false)
  const [modal0, setModal0] = React.useState(false)

  const [connected, setConnected] = React.useState(false)

  const [render, setRender] = React.useState(false)
  const [open, setOpen] = React.useState(true)

  const [bets, setBets] = React.useState([])
  const [formatbets, setformatBets] = React.useState([])

  const [balance, setBalance] = React.useState('')
  const [currency, setCurrency] = React.useState(0)
  const [clock, setClock] = React.useState('')

  const [metamaskCxt, setMetamaskCxt] = React.useContext(MetamaskContext);


  React.useEffect(() => {

    const getBalance = async () => {

      const provider = new ethers.JsonRpcProvider(
        GOERLI_URL,
      );

      console.log({ provider });

      const balance = await provider.getBalance(
        '0x9b0164272ca6744eb66d8508191Ff6fAA8475b1a',
      );

      console.log({ balance });

      const balanceInETH = ethers.formatEther(balance);

      setBalance(balanceInETH);
    }

    getBalance()
    arrangeCurrency()
  }, [])

  useInterval(() => {
    arrangeClock()
  }, 1000);

  const arrangeCurrency = () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
      .then((response) => response.json())
      .then((responseJson) => {
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

  const selectNumber = (index) => {
    let newList = numbers

    newList[index] = !newList[index]

    setNumbers(newList)

    const newOpen = newList.filter((val) => val)

    if (newOpen.length == 6) {
      setOpen(false)
    } else {
      setOpen(true)
    }

    setRender(!render)
  }

  const addBet = () => {
    const newBet = numbers.map((val, index) => {
      if (val) {
        return (index + 1)
      }
    })

    const filtered = newBet.filter((val) => val != undefined)

    const newListBets = bets

    newListBets.push(filtered)

    setBets(newListBets)

    const newFormatBets = formatbets.concat(filtered)

    setformatBets(newFormatBets)

    const reset = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
    setNumbers(reset)
    setOpen(true)
    setRender(!render)
  }

  const removeBet = (index) => {
    const newBets = bets

    newBets.splice(index, 1)

    setBets(newBets)

    const newFormatBets = formatbets

    newFormatBets.splice(6 * index, 1)
    newFormatBets.splice(6 * index, 1)
    newFormatBets.splice(6 * index, 1)
    newFormatBets.splice(6 * index, 1)
    newFormatBets.splice(6 * index, 1)
    newFormatBets.splice(6 * index, 1)

    setformatBets(newFormatBets)

    setRender(!render)
  }

  const startPay = async() => {
    if (metamaskCxt.address != undefined){
      setConnected(true)
      setModal0(true)
      setTimeout(async () => {
        setModal0(false)
        setModal(true)
  
        sendTransaction()
      }, 5000);
    }else{
      setModal0(true)
    }
  }

  const connect = async () => {

    const accounts = await singletonSDKInstance.getUser()

    const balance = await singletonSDKInstance.getBalance()

    const newContext = {
      address: accounts[0],
      balance: balance,
    }

    setMetamaskCxt(newContext);
    setConnected(true)
    setRender(!render)

    setTimeout(async () => {
      setModal0(false)
      setModal(true)

      sendTransaction()
    }, 10000);
  }

  const sendTransaction = async() => {
    const value = 0.0011 * bets.length

    const result = await singletonSDKInstance.enterLottery(formatbets, value)

    console.log({result})

    closeModal()

  }

  const closeModal = () => {
    setBets([])
    setTimeout(async () => {
      setModal(false)
      setRender(!render)
    }, 5000);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 200, backgroundColor: myPallete.lightGreen, borderRadius: 20, width: '80%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            {bets.length > 0 ? (
              <>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20 }}>Waiting for approval</Text>
                <TouchableOpacity style={{padding: 14, borderRadius: 10, borderWidth: 1, borderColor: myPallete.mainOrange, marginTop: 20, alignItems: 'center', justifyContent: 'center'}} onPress={() => sendTransaction()}>
                  <Text style={{ fontSize: 20, color: myPallete.mainOrange, fontWeight: '500' }}>Resend transaction</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image resizeMode='contain' source={meta} style={{ width: 80, height: 80, borderRadius: 50 }} />
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20 }}>Transaction approved</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modal0}>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => connect()} style={{ padding: 14, backgroundColor: myPallete.lightGreen, borderRadius: 20, width: '80%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <Image resizeMode='contain' source={meta} style={{ width: 80, height: 80, borderRadius: 50 }} />
            {connected ? (
              <>
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20, textAlign: 'center' }}>Address: {metamaskCxt.address}</Text>
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20, textAlign: 'center' }}>Balance: {metamaskCxt.balance}</Text>
                <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 40, textAlign: 'center' }}>You will be redirected to approve the transaction</Text>
              </>
            ) : (
              <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20, textAlign: 'center' }}>Connect to your MetaMask wallet</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>New Bet</Text>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} >
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Total in contract:</Text>
          <View>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>{Math.round(balance * 10000) / 10000} eth</Text>
            <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>{Math.round(balance * currency * 100) / 100} USD</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 14 }} >
          <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Next drawn in:</Text>
          <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>{clock.d}d, {clock.h}h, {clock.m}m, {clock.s}s</Text>
        </View>
      </View>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%' }}>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Select 6 numbers</Text>
          <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7 }}>
            <Image resizeMode='contain' source={heart} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 14 }}>
          {numbers.map((val, index) => (
            <>
              {val ? (
                <TouchableOpacity key={index} onPress={() => selectNumber(index)} style={{ backgroundColor: myPallete.mainGreen, width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>{index + 1}</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {open ? (
                    <TouchableOpacity key={index} onPress={() => selectNumber(index)} style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                      <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>{index + 1}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity key={index} style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#aaa', borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                      <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>{index + 1}</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', width: '100%', marginTop: 20 }}>
          {open ? (
            <TouchableOpacity style={{ width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#aaa', borderWidth: 0.7 }}>
              <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Add bet</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => addBet()} style={{ width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7 }}>
              <Text style={{ fontSize: 20, color: myPallete.mainGreen, fontWeight: '500' }}>Add bet</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Bets</Text>
        {bets.length > 0 ? (
          <>
            {bets.map((val, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginLeft: 14 }}>
                <Image resizeMode='contain' source={heart} style={{ width: 20, height: 20 }} />
                <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>{val[0]}, {val[1]}, {val[2]}, {val[3]}, {val[4]}, {val[5]}, </Text>
                <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>0.002</Text>
                <TouchableOpacity onPress={() => removeBet(index)}>
                  <Image resizeMode='contain' source={trash} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>No bets yet</Text>
          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 14, alignSelf: 'center', width: '95%', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Total cost eth: 0.00{bets.length * 11} eth</Text>
        {bets.length > 0 ? (
          <TouchableOpacity onPress={() => startPay()} style={{ width: 120, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: myPallete.mainGreen, marginLeft: 10 }}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>Place Bets</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ width: 120, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#555', marginLeft: 10 }}>
            <Text style={{ fontSize: 20, color: '#888', fontWeight: '500' }}>Place Bets</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: 10, height: 100 }} />
    </ScrollView>
  );
};
export default NewBetScreen;