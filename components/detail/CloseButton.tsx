import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const CloseButton = () => {
  return (
    <View className='bg-transparent justify-end mt-20 z-20' style={[{ flexDirection: 'row', alignItems: 'center', gap: 50 }]}>
        <Feather name="x" size={24} color="white" />
      </View>
  )
}

export default CloseButton