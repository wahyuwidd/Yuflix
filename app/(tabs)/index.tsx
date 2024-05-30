import { StyleSheet, StatusBar, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ParallaxNavbar from '@/components/ParallaxNavbar';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { api, imageBaseUrl } from '@/utils/api';
import MoviesPage from '@/components/home/MoviePage';
import PopularPage from '@/components/home/PopularPage';
import TvPage from '@/components/home/TvShowPage';


export default function HomeScreen() {
  const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY
  const { params } = useLocalSearchParams<{params: string}>();
  
  const [Trending, setTrending] = useState<Movie[]>([]);
  const [MoviePopular, setMoviePopular] = useState<Movie[]>([]);
  const [TvTrending, setTvTrending] = useState<Tv[]>([]);
  const [currentPage, setCurrentPage] = useState('movies');


  useEffect(() => {
    if(params != undefined){
      setCurrentPage(params!);
    }
  }, [params]);

  useEffect(() => {
    const fetchData = async (url: string, setData: any) => {
        try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data.results);
        } catch (error) {
        console.error(error);
    }};
    fetchData(`${api}/trending/movie/day?api_key=${apiKey}`, setTrending);
    fetchData(`${api}/movie/popular?api_key=${apiKey}`, setMoviePopular);
    fetchData(`${api}/trending/tv/day?api_key=${apiKey}`, setTvTrending);
}, [apiKey]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ParallaxNavbar
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={{
              uri: `${imageBaseUrl}${currentPage === 'movies' ? Trending[0]?.poster_path : currentPage === 'popular' ? MoviePopular[0]?.poster_path : currentPage === 'tv' ? TvTrending[0]?.poster_path : ''}`,
            }}
            style={styles.poster}
          />
        }
        data={(currentPage === 'movies' ? Trending : currentPage === 'popular' ? MoviePopular : currentPage === 'tv' ? TvTrending : []) as any[]}
      > 
      <View>

      {currentPage === 'movies' && <MoviesPage />}
      {currentPage === 'popular' && <PopularPage />}
      {currentPage === 'tv' && <TvPage />}

      </View>

      </ParallaxNavbar>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  poster: {
    height: "100%",
    width: "100%",
    position: "absolute",
    
  },
  titlePoster: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 17,
    marginBottom: 5
  }
});
