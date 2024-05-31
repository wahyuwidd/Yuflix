import { View, Text, Image } from 'react-native'
import React from 'react'

const SkeletonCardHome = () => {
  const data = [1,2,3,4]
  return (
    <View className='flex flex-row gap-1'>
        {data.map((data, index) => (
            <View key={index} className='flex items-center justify-center h-[170px] w-[115px] rounded-md mb-3 bg-gray-300 animate-pulse'>
                <Image className="h-[170px] w-[115px] rounded-md" source={require('@/assets/images/logo.png')} />
            </View>
        ))}
    </View>
  )
}

export default SkeletonCardHome