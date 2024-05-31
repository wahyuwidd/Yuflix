
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const CardPeople = ({Poeple}: {Poeple : People[]}) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row gap-1">
        {Poeple.map((data, index) => (
            <Link className='mb-8' key={index} href={`/person/detail/${data.id}`}>
            <View className='mb-8 items-center text-center justify-center'>
            <Image
            className="h-[110px] w-[110px] rounded-full backdrop-blur-lg"
            style={{ borderWidth: 1, borderColor: colors[index % colors.length], opacity: 0.5 }}
            source={{
                uri: `https://image.tmdb.org/t/p/w500${data.profile_path}`,
            }}
            />
            <View className='absolute'>
                <Text key={data.id} className='text-white text-center mt-[100px] font-bold text-md'>{data.name}</Text>
                <View className='justify-center items-center text-center'>
                    <Text key={data.popularity} className='text-gray-300 mt-1 text-xs'>{data.known_for_department}</Text>
                </View>
            </View>
        </View>
        </Link>
        ))}
        </View>
    </ScrollView>
)
}

export default CardPeople