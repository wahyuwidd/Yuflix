import { View, Text, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { api } from '@/utils/api';

const ToggleMenu = ({data}:{data:any[]}) => {
    const [movieDetail, setMovieDetail] = useState<Moviedetail>();
    const [movieVideo, setMovieVideo] = useState<MovieVideo>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [TvDetail, setTvDetail] = useState<Tv>();
    const [isTv, setIsTv] = useState(false);
    const [isLoadedDetail, setIsLoadedDetail] = useState(false);
    const [isLoadedTvDetail, setIsLoadedTvDetail] = useState(false);

    useEffect(() => {
        if (data.length !== 0) {
            setIsLoaded(true);
            // console.log(data[0].media_type);
            
            if (data[0].media_type === 'tv') {
                setIsTv(true);
            } else if (data[0].media_type === 'movie') {
                setIsTv(false)
            } else if (data[0].media_type === undefined) {
                setIsTv(false)
            }
        }
    }, [data]);

    const id = isLoaded ? data[0].id : null;

    useEffect(() => {
        if (id) {
            fetch(`${api}/movie/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setMovieDetail(data) 
                    setIsLoadedDetail(true)
                })
                .catch(err => {console.log(err), ()=> setIsLoadedDetail(false)});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`${api}/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => setMovieVideo(data))
        }
    }, [id]);
    
    useEffect(() => {
        if (id) {
            fetch(`${api}/tv/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setTvDetail(data);
                    // setIsLoadedTvDetail(true);
                })
                .catch(err => {console.log(err), ()=> setIsLoadedTvDetail(false)});  
        }
    }, [id]);

    console.log(isLoadedDetail);
    
return (
    <>
    <View className='mt-[300px] justify-center items-center text-center z-20'>
        {data.length != 0 && <Text style={{ fontFamily: "TacOne"}} className='text-white font-bold text-5xl'>{isTv ? TvDetail?.name : movieDetail?.title}</Text>}
    </View>
    <View className='flex-1 justify-center mt-[20px] z-20' style={[{ flexDirection: 'column', alignItems: 'center' }]}>
        <View className='flex-row justify-center mb-4'>
        {isLoadedDetail ? (
            <> 
                {isTv ? (
                    <>
                        {TvDetail?.genres?.map((genre, index) => (
                        <Link href={`/genre/${genre.id}-${genre.name}`} key={genre.id} className="text-gray-300 text-sm text-center">
                        {genre.name}
                        {index < TvDetail.genres.length - 1 ? ' · ' : ''}
                        </Link>
                        ))}
                    </>
                ): (
                    <>
                        {movieDetail?.genres?.map((genre, index) => (
                        <Link href={`/genre/${genre.id}-${genre.name}`} key={genre.id} className="text-gray-300 text-sm text-center">
                        {genre.name}
                        {index < movieDetail.genres.length - 1 ? ' · ' : ''}
                        </Link>
                        ))}
                    </>
                )}
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