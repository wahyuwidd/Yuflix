import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native'

const DetailPerson = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [person, setPerson] = useState<Person>();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setPerson(data)
        })
    })
    return (
        <View className='bg-[#151515] h-full'>
            {person && <Text className='text-white text-3xl font-bold p-4'>{person.name}</Text>}
        </View>
    )
}

export default DetailPerson