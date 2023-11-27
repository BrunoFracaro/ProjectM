import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { myPallete } from '../components/colorPallete';


const NewBetScreen = () => {

  const [numbers, setNumbers] = React.useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
  ])

  const [render, setRender] = React.useState(false)
  const [open, setOpen] = React.useState(true)

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: myPallete.backgroundBlack, paddingTop: 50 }}>
      <Text style={{ color: myPallete.mainGreen, fontSize: 28, marginLeft: 18 }}>New Bet</Text>
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 30, width: '95%', marginTop: 14, alignSelf: 'center' }}>
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
      <View style={{ padding: 14, backgroundColor: '#373737', borderRadius: 30, width: '95%', marginTop: 14, alignSelf: 'center' }}>
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
                <TouchableOpacity onPress={() => selectNumber(index)} style={{ backgroundColor: myPallete.mainGreen, width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>{index + 1}</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {open ? (
                    <TouchableOpacity onPress={() => selectNumber(index)} style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                      <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>{index + 1}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#aaa', borderWidth: 0.7, marginHorizontal: 5, marginVertical: 5 }}>
                      <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>{index + 1}</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', width: '100%', marginTop: 20 }}>
          <TouchableOpacity style={{ width: 100, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: myPallete.mainGreen, borderWidth: 0.7 }}>
            <Text style={{ fontSize: 20, color: '#aaa', fontWeight: '500' }}>Add bet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: 10, height: 100 }} />
    </ScrollView>
  );
};
export default NewBetScreen;