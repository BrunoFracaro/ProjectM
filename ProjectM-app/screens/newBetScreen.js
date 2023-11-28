import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { myPallete } from '../components/colorPallete';

const NewBetScreen = () => {

  const [numbers, setNumbers] = React.useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
  ])

  const [modal, setModal] = React.useState(false)

  const [render, setRender] = React.useState(false)
  const [open, setOpen] = React.useState(true)

  const [bets, setBets] = React.useState([])

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
        return index
      }
    })

    const filtered = newBet.filter((val) => val != undefined)

    const newListBets = bets

    newListBets.push(filtered)

    setBets(newListBets)

    const reset = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
    setNumbers(reset)
    setOpen(true)
    setRender(!render)
  }

  const removeBet = (index) => {
    const newBets = bets

    newBets.splice(index, 1)

    setBets(newBets)
    setRender(!render)
  }

  const placeBet = () => {
    setModal(true)
  }

  const closeModal = () => {
    setBets([])
    setModal(false)
    setRender(!render)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={{flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ height: 200, backgroundColor: myPallete.lightGreen, borderRadius: 20, width: '80%', marginTop: 14, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#000000"/>
            <TouchableOpacity onPress={() => closeModal()}>
              <Text style={{ fontSize: 20, color: '#000', fontWeight: '500', marginTop: 20 }}>Waiting for approval</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>New Bet</Text>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} >
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Total in contract:</Text>
          <View>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>15.1 eth</Text>
            <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>1478.00 USD</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 14 }} >
          <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Next drawn in:</Text>
          <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>6d 10h 24m 54s</Text>
        </View>
      </View>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 20, width: '95%', marginTop: 14, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%' }}>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '500' }}>Select 6 numbers</Text>
          <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7 }}>
            <FontAwesome name="heart" color={myPallete.mainGreen} size={18} />
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
                <FontAwesome name="heart" color={myPallete.mainGreen} size={18} />
                <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>{val[0]}, {val[1]}, {val[2]}, {val[3]}, {val[4]}, {val[5]}, </Text>
                <Text style={{ fontSize: 16, color: '#aaa', fontWeight: '500' }}>0.002</Text>
                <FontAwesome onPress={(index) => removeBet(index)} name="trash" color={myPallete.deleteRed} size={18} />
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
        <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Total cost eth: 0.00{bets.length * 2} eth</Text>
        {bets.length > 0 ? (
          <TouchableOpacity onPress={() => placeBet()} style={{ width: 120, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: myPallete.mainGreen, marginLeft: 10 }}>
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