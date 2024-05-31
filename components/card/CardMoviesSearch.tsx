
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const CardMovies = ({data}:{data:Tv[]}) => {
  return (
    <ScrollView>
        <Text className='text-white pl-3 my-3 font-bold text-xl'>Airing Today</Text>
        {data.map((data) => (
            <View className='flex flex-row' key={data.id}>
                <Image source={{uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`}} className="h-[90px] w-[155px] mb-3" />
                <View className='bg-[#222831] h-[90px] w-full mr-10'>
                    <Text className='text-white pl-4 mt-8 text-md font-bold w-[155px]'>{data.name}</Text>
                    <View className='absolute w-full mt-8 ml-[190px]'>
                        <Feather name="play-circle" size={24} color="white" />
                    </View>
                </View>
            </View>
        ))}
    </ScrollView>
  )
}

export default CardMovies