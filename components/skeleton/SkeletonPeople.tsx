import { View, Text, Image } from 'react-native'
import React from 'react'

const SkeletonCardPeople = () => {
  const data = [1,2,3,4]
  return (
    <View className='flex flex-row gap-1'>
        {data.map((data, index) => (
            <View key={index} className='flex items-center justify-center h-[110px] w-[110px] rounded-full mb-3 bg-gray-300 animate-pulse'>
                {/* <Image className="h-[110px] w-[110px] rounded-md" source={require('@/assets/images/logo.png')} /> */}
            </View>
        ))}
    </View>
  )
}

export default SkeletonCardPeople