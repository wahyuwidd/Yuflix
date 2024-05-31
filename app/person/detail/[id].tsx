import CardMovies from '@/components/home/CardMovies';
import CardPerson from '@/components/home/CardPerson';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native'

const DetailPerson = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [person, setPerson] = useState<Person>();
    const [movieCredits, setMovieCredits] = useState<Movie[]>();
    const apikey = process.env.EXPO_PUBLIC_TMBD_API_KEY

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`)
        .then(response => response.json())
        .then(data => {
            setPerson(data)
        })
    }, [id])

    useEffect(() => {
        fetch( `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}`)
        .then(response => response.json())
        .then(data => setMovieCredits(data.cast))
    }, [id])
    
    
    return (
        <View className='bg-[#151515] h-full w-full'>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
                <View className='mt-20'>
                    <View className='justify-center items-center'>
                        <Image
                            className='h-[250px] w-[250px] rounded-full'
                            source={{ uri: 'https://image.tmdb.org/t/p/w500' + person?.profile_path }} />
                    </View>
                    <Text className='text-white mt-5 text-2xl text-center font-bold'>{person?.name}</Text>
                    <Text className='text-gray-300 mt-2 text-sm text-center '>{person?.place_of_birth}</Text>
                    <View className='bg-gray-600 p-3 rounded-full mt-5 items-center justify-center mx-4' style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ alignItems: 'center', marginRight: 10 }}>
                            <Text className='text-white text-sm'>Gender</Text>
                            <Text className='text-white text-sm'>
                                {person?.gender === 0 ? 'Not set / not specified' : 
                                person?.gender === 1 ? 'Female' : 
                                person?.gender === 2 ? 'Male' : 
                                person?.gender === 3 ? 'Non-binary' : 'Unknown'}
                            </Text>
                        </View>
                        <View style={{ height: '100%', width: 1, backgroundColor: 'white', marginHorizontal: 10 }} />
                        <View style={{ alignItems: 'center', marginRight: 10 }}>
                            <Text className='text-white text-sm'>Birthday</Text>
                            <Text className='text-white text-sm'>{person?.birthday}</Text>
                        </View>
                        <View style={{ height: '100%', width: 1, backgroundColor: 'white', marginHorizontal: 10 }} />
                        <View style={{ alignItems: 'center', marginRight: 10 }}>
                            <Text className='text-white text-sm'>Known for</Text>
                            <Text className='text-white text-sm'>{person?.known_for_department}</Text>
                        </View>
                        <View style={{ height: '100%', width: 1, backgroundColor: 'white', marginHorizontal: 10 }} />
                        <View style={{ alignItems: 'center' }}>
                            <Text className='text-white text-sm'>Popularity</Text>
                            <Text className='text-white text-sm'>{person?.popularity}</Text>
                        </View>
                    </View>
                    <View className='mx-4'>
                        <Text className='text-white mt-5 text-xl font-bold'>Biography</Text>
                        <Text className='text-gray-300 mt-2 text-sm'>{person?.biography}</Text>
                    </View>
                    <View className='mx-4'>
                        <Text className='text-white mt-5 text-xl font-bold mb-3'>Movies</Text>
                        {movieCredits && (
                            <CardPerson Data={movieCredits!} />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailPerson