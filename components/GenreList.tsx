
import { View, Text } from 'react-native'
import React from 'react'

const GenreList = () => {
  return (
    <View className='flex-1 justify-center mt-[280px]' style={[{ flexDirection: 'row', alignItems: 'center', gap:2 }]}>
      <Text className='text-gray-300 text-sm ' style={{zIndex:1}} >Comedy · </Text>
      <Text className='text-gray-300 text-sm ' style={{zIndex:1}} >Teen · </Text>
      <Text className='text-gray-300 text-sm ' style={{zIndex:1}} >Ominous</Text>
    </View>
  )
}

export default GenreList