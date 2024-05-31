import { Image } from 'expo-image';
import { View, Text, StyleSheet, Linking, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { api } from '@/utils/api';
import CardSimiliar from '@/components/card/CardSimiliar';

const DetailMovie = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const [movieDetail, setMovieDetail] = useState<Moviedetail>();
  const [movieVideo, setMovieVideo] = useState<MovieVideo>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setMovieDetail(data)
      setIsLoaded(true)

    })
  }, [id])
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => {setMovieVideo(data)})
  }, [id])

  useEffect(() => {
    fetch(`${api}/movie/${id}/similar?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setSimilarMovies(data.results)
    })
  }, [id])

  const handlePress = (url: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${url}`).catch(err => console.error("Couldn't load page", err));
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  if(!movieDetail) return null
  const isLongText = movieDetail!.overview.length > 50;
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <>
    {isLoaded ? (
      <><Image className='w-full h-full' blurRadius={100} contentFit='fill' source={'https://image.tmdb.org/t/p/w500' + movieDetail?.poster_path} /><View style={styles.overlay} /><View className='flex-1' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
            <View className='mt-20 justify-center items-center'>
              <Image
                className='h-[200px] w-[145px] rounded-md'
                source={{ uri: 'https://image.tmdb.org/t/p/w500' + movieDetail?.poster_path }} />
              <Text className='text-white mt-2 text-2xl text-center font-bold'>{movieDetail?.title}</Text>
              <View className='mt-3' style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text className='text-gray-300 text-md'>
                  {movieDetail?.status} · {movieDetail?.release_date.split('-')[0]} · {movieDetail?.runtime} min
                </Text>
              </View>
              <View className='mt-2 items-center justify-center mx-10' style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {movieDetail?.genres?.map((genre, index) => (
                  <Link href={`/genre/${genre.id}-${genre.name}`} key={genre.id} className="text-gray-300 text-sm text-center">
                    {genre.name}
                    {index < movieDetail.genres.length - 1 ? ' · ' : ''}
                  </Link>
                ))}
              </View>
              <Text
                onPress={() => handlePress(`${movieVideo?.results[0]?.key}`)}
                className='mt-[10px] bg-white px-32 py-4 rounded-md font-bold'
              >
                <FontAwesome5 name="play" size={15} color="black" /> Play
              </Text>
              <Text className='px-1 mx-[5px] text-md text-white mt-4'>
                {isLongText && !isExpanded ? `${movieDetail?.overview.substring(0, 160)}...` : movieDetail?.overview}
              </Text>
              {isLongText && (
                <Text className='text-blue-300 text-sm' onPress={toggleExpansion}>
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Text>
              )}
              <Text className='text-sm' style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, textAlign: 'left', color: '#D1D5DB' }}>
                <Text style={{ fontWeight: 'bold' }}>Production:</Text> {movieDetail?.production_companies?.map((company) => company.name).join(', ')}
              </Text>
              <Text className='text-sm' style={{ alignSelf: 'flex-start', marginLeft: 20, textAlign: 'left', color: '#D1D5DB' }}>
                <Text style={{ fontWeight: 'bold' }}>Release Date:</Text> {movieDetail?.release_date}
              </Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View className='w-full flex flex-row gap-4 p-5'>
                  {movieVideo?.results.map((video) => (
                    <View className='w-[250px] relative' key={video.id}>
                      <TouchableOpacity onPress={() => handlePress(`${video.key}`)}>
                      <Image
                        className='w-[250px] h-[140px] mt-2 rounded-md'
                        source={{ uri: 'https://img.youtube.com/vi/' + video.key + '/maxresdefault.jpg' }} />
                      <View className='w-[250px] h-[140px] mt-2 rounded-md' style={styles.overlay} />
                      <View className='absolute items-center mt-2 justify-center w-[250px] h-[140px]'>
                        <FontAwesome5 name="play" size={25} color="white" />
                      </View>
                      </TouchableOpacity>
                      <Text className='text-white font-bold'>{video.type} - {`On ${video.site}`} </Text>
                      <Text className='text-white'>{video.name}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
              
              {similarMovies && similarMovies.length > 0 && (
                <><Text className='mt-15 text-xl text-white font-bold'>Similar Movies</Text><ScrollView>
                  <View className='w-full flex flex-row flex-wrap justify-between gap-1 p-3'>
                    {similarMovies.slice(0, 18).map((data, index) => (
                      <Link
                        className="h-[170px] w-[115px] rounded-md mb-3"
                        href={`/movies/detail/${data.id}`}
                        key={index}
                      >
                        <CardSimiliar uri={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                      </Link>
                    ))}
                  </View>
                </ScrollView></>
  
              )}
              
            </View>
          </ScrollView>
        </View></>
    ): null}
      
      
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