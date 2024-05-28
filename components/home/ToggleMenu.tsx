import { View, Text, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { api } from '@/utils/api';

const ToggleMenu = ({data}:{data:Movie[]}) => {
    const [movieDetail, setMovieDetail] = useState<Moviedetail>();
    const [movieVideo, setMovieVideo] = useState<MovieVideo>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedDetail, setIsLoadedDetail] = useState(true);

    useEffect(() => {
        if (data.length !== 0) {
            setIsLoaded(true);
        }
    }, [data]);

    const id = isLoaded ? data[0].id : null;

    useEffect(() => {
        if (id) {
            fetch(`${api}/movie/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => {setMovieDetail(data),()=> setIsLoadedDetail(true)});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`${api}/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => setMovieVideo(data));
        }
    }, [id]);    
    console.log(movieDetail);
    
return (
    <>
    <View className='mt-[300px] justify-center items-center text-center z-20'>
        {data.length != 0 && <Text style={{ fontFamily: "TacOne"}} className='text-white font-bold text-5xl'>{data[0].title}</Text>}
    </View>
    <View className='flex-1 justify-center mt-[20px] z-20' style={[{ flexDirection: 'column', alignItems: 'center' }]}>
        <View className='flex-row justify-center mb-4'>
        {isLoadedDetail ? (
            <>
            {movieDetail?.genres.map((genre, index) => (
            <Link key={genre.id} href={`/genre/${genre.id}-${genre.name}`} className="text-white mx-2">
            {genre.name}
            </Link>
        ))}
            </>
        ): null}
        
        </View>
        <View className='flex-row items-center' style={{ gap: 50 }}>
            {isLoaded ? (
                <><View className='items-center mt-2'>
                        <Ionicons name="add" size={16} color="white" />
                        <Text className='text-gray-300' style={{ fontSize: 10 }}>MyList</Text>
                    </View><Text className='text-black bg-white px-6 pr-6 py-3 rounded-md font-bold'>
                            <FontAwesome5 name="play" size={15} color="black" />  Watch Trailer
                        </Text><Link href={`/movies/detail/${data[0].id}`}>
                            <View className='items-center mt-2'>
                                <AntDesign name="infocirlceo" size={16} color="white" />
                                <Text className='text-gray-300' style={{ fontSize: 10 }}>Info</Text>
                            </View>
                        </Link></>
            ): null}
            
        </View>
    </View></>
)}

export default ToggleMenu