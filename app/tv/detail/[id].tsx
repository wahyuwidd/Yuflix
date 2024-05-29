import { Image } from 'expo-image';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';

const DetailMovie = () => {
const { id } = useLocalSearchParams<{id: string}>();
  const [tvDetail, setTvDetail] = useState<Tv>();
  const [movieVideo, setMovieVideo] = useState<MovieVideo>();
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => {setTvDetail(data)})
  }, [id])
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => {setMovieVideo(data)})
  }, [id])

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  if(!tvDetail) return null
  let isLongText = false

  if(tvDetail!.overview.length > 160){
    isLongText = true
  }
  
  return (
    <>
    <View className='bg-[#151515] h-full'>
      <Image className='w-full h-full' blurRadius={100} contentFit='fill' source={'https://image.tmdb.org/t/p/w500' + tvDetail?.poster_path} />
      <View style={styles.overlay} />
      <View className='absolute items-center mt-20 flex-1 w-full'>
        <Image className='h-[200px] w-[145px] rounded-md' source={'https://image.tmdb.org/t/p/w500' + tvDetail?.poster_path} />
        <Text className='text-white mt-2 text-2xl text-center font-bold'>{tvDetail?.name}</Text>
        <View className='mt-3' style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text className='text-gray-300 text-md'>{tvDetail?.first_air_date.split('-')[0]}</Text>
        </View>
        <View className='mt-2 items-center justify-center mx-10' style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {tvDetail?.genres?.map((genre, index) => (
          <Text key={genre.id} className="text-gray-300 text-sm text-center">
            {genre.name}
            {index < tvDetail.genres.length - 1 ? ' · ' : ''}
          </Text>
        ))}
        </View>
        {
          movieVideo!.results.length > 0 && (
            <Text onPress={() => handlePress(`https://www.youtube.com/watch?v=${movieVideo?.results[0]?.key}`)} className='mt-[10px] bg-white px-32 py-3 rounded-md font-bold'><FontAwesome5 name="play" size={15} color="black" /> Play </Text>
        )}
        <Text className='px-1 mx-[5px] text-md text-white mt-4'>{isLongText && !isExpanded ? `${tvDetail?.overview.substring(0, 160)}...` : tvDetail?.overview}</Text>
        {isLongText && (
        <Text className='text-blue-300 text-sm font-bold' onPress={toggleExpansion}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
        )}
        <Text className='text-sm' style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10, textAlign: 'left', color: '#D1D5DB' }}>
          <Text style={{ fontWeight: 'bold' }}>Production:</Text> {tvDetail?.production_companies?.map((company) => company.name).join(', ')}
        </Text>
        <Text className='text-sm' style={{ alignSelf: 'flex-start', marginLeft: 10, textAlign: 'left', color: '#D1D5DB' }}>
          <Text style={{ fontWeight: 'bold' }}>Release Date:</Text> {tvDetail?.first_air_date}
        </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className='w-full flex flex-row gap-4 p-2'>
        {movieVideo?.results.map((video) => (
          <View className='w-[250px] relative' key={video.id}>
          <Image
            className='w-[250px] h-[140px] mt-2 rounded-md'
            source={{ uri: 'https://img.youtube.com/vi/' + video.key + '/maxresdefault.jpg' }}
          />
          <View className='w-[250px] h-[140px] mt-2 rounded-md' style={styles.overlay} />
          <View className='absolute items-center mt-2 justify-center  w-[250px] h-[140px]'>
            <FontAwesome5 name="play" size={25} color="white" />
          </View>
          <Text className='text-white font-bold'>{video.type} - {`On ${video.site}`} </Text>
          <Text className='text-white'>{video.name}</Text>
        </View>
        ))}
      </View>
      </ScrollView>
      </View>
      
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151515',
    opacity: 0.4,
  },
})

export default DetailMovie