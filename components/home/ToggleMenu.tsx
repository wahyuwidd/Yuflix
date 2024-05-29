import { View, Text, Linking, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { api } from '@/utils/api';

const ToggleMenu = ({data}:{data:any[]}) => {
    const [movieDetail, setMovieDetail] = useState<Moviedetail>();
    const [movieVideo, setMovieVideo] = useState<MovieVideo>();
    const [TvVideo, setTvVideo] = useState<MovieVideo>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [TvDetail, setTvDetail] = useState<Tv>();
    const [isTv, setIsTv] = useState(false);
    const [isLoadedDetail, setIsLoadedDetail] = useState(false);
    const [isLoadedTvDetail, setIsLoadedTvDetail] = useState(false);
    const [isTvTrailer, setIstvTrailer] = useState(false);
    const [isMovieTrailer, setIsMovieTrailer] = useState(false);
    const [movietrailer, setMovieTrailer] = useState('');
    const [tvTrailer, setTvTrailer] = useState('');

    useEffect(() => {
        if (data.length !== 0) {
            setIsLoaded(true);
            
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
            fetch(`${api}/tv/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setTvDetail(data);
                })
                .catch(err => {console.log(err), ()=> setIsLoadedTvDetail(false)});
        }
    }, [id]);

    useEffect(() => {
        if(id) {
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setMovieVideo(data);
                
                if (data && data.results) {
                    const trailerVideo = data.results.find((video: { type: string; }) => video.type === 'Trailer') || data.results[0];
                    setMovieTrailer(trailerVideo?.key || '');
                } else {
                    setMovieTrailer('');
                }
                
                setIsMovieTrailer(true);
            })
            .catch(error => {
                console.error('Error fetching movie videos:', error);
                setMovieTrailer('');
                setIsMovieTrailer(false);
            });
        } 
    }, [id])

    useEffect(() => {
        if(id){
            fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setTvVideo(data);
                
                if (data && data.results) {
                    const trailerVideo = data.results.find((video: { type: string; }) => video.type === 'Trailer') || (movieVideo && movieVideo.results ? movieVideo.results[0] : undefined);
                    setTvTrailer(trailerVideo?.key || '');
                } else {
                    setTvTrailer('');
                }
                
                setIstvTrailer(true);
            })
            .catch(error => {
                console.error('Error fetching TV videos:', error);
                setTvTrailer('');
                setIstvTrailer(false);
            });
        }
    }, [id])

    const handlePress = (url: string) => {
        Linking.openURL(`https://www.youtube.com/watch?v=${url}`).catch(err => console.error("Couldn't load page", err));
    }
    
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
                    </View><Text onPress={() => handlePress(isTv ? `${tvTrailer}` : `${movietrailer}`)} className='text-black bg-white px-6 pr-6 py-3 rounded-md font-bold'>
                            <FontAwesome5 name="play" size={15} color="black" />  Watch Trailer
                        </Text><Link href={isTv ? `/tv/detail/${data[0].id}` : `/movies/detail/${data[0].id}`}>
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