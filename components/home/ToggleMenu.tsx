import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ToggleMenu = () => {
  return (
    <>
    <View className='mt-[330px] justify-center items-center text-center z-20'>
        <Text style={{ fontFamily: "TacOne"}} className='text-white font-bold text-5xl'>B X H U M A</Text>
    </View>
    <View className='flex-1 justify-center mt-[20px] z-20' style={[{ flexDirection: 'row', alignItems: 'center', gap: 50 }]}>
          <View className='items-center mt-2'>
              <Ionicons name="add" size={16} color="white" />
              <Text className='text-gray-300' style={{ fontSize: 10 }}>MyList</Text>
          </View>
          <Text className='text-black bg-white pl-6 pr-6 pt-2 pb-2 rounded-sm font-bold'><FontAwesome5 name="play" size={15} color="black" />  Play</Text>
          <View className='items-center mt-2'>
              <AntDesign name="infocirlceo" size={16} color="white" />
              <Text className='text-gray-300' style={{ fontSize: 10 }}>Info</Text>
          </View>
      </View></>
  )
}

export default ToggleMenu