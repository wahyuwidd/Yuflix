import { StyleSheet, StatusBar, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ParallaxNavbar from '@/components/ParallaxNavbar';
import { useEffect, useState } from 'react';
import CardMovies from '@/components/home/CardMovies';
import CardPeople from '@/components/home/CardPeople';
import { useLocalSearchParams } from 'expo-router';
import { api, imageBaseUrl } from '@/utils/api';
import CardTv from '@/components/home/CardTv';
import SkeletonCardHome from '@/components/home/Skeleton';
import SkeletonCardPeople from '@/components/home/SkeletonPeople';
import MoviesPage from '@/components/home/MoviePage';
import PopularPage from '@/components/home/PopularPage';
import TvPage from '@/components/home/TvShowPage';


export default function HomeScreen() {
  const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY
  const { params } = useLocalSearchParams<{params: string}>();
  
  const [People, setPeople] = useState<People[]>([]);
  const [PeoplePopular, setPeoplePopular] = useState<People[]>([]);
  const [MoviePopular, setMoviePopular] = useState<Movie[]>([]);
  const [TvPopular, setTvPopular] = useState<Tv[]>([]);
  const [Trending, setTrending] = useState<Movie[]>([]);
  const [TopRated, setTopRated] = useState<Movie[]>([]);
  const [Upcoming, setUpcoming] = useState<Movie[]>([]);
  const [TvTrending, setTvTrending] = useState<Tv[]>([]);
  const [TvTopRated, setTvTopRated] = useState<Tv[]>([]);
  const [TvOnAir, setTvOnAir] = useState<Tv[]>([]);
  const [isLoadedPeople, setIsLoadedPeople] = useState(true);
  const [isLoadedPopularPeople, setIsLoadedPopularPeople] = useState(true);
  const [currentPage, setCurrentPage] = useState('movies');
  const [isLoadedTrending, setIsLoadedTrending] = useState(true);
  const [isLoadedTopRated, setIsLoadedTopRated] = useState(true);
  const [isLoadedUpcoming, setIsLoadedUpcoming] = useState(true);
  const [isLoadedMoviePopular, setIsLoadedMoviePopular] = useState(true);
  const [isLoadedTvPopular, setIsLoadedTvPopular] = useState(true);
  const [isLoadedTvTrending, setIsLoadedTvTrending] = useState(true);
  const [isLoadedTvTopRated, setIsLoadedTvTopRated] = useState(true);
  const [isLoadedTvOnAir, setIsLoadedTvOnAir] = useState(true);

  useEffect(() => {
    if(params != undefined){
      setCurrentPage(params!);
    }
  }, [params]);

  useEffect(() => {
    fetch(`${api}/trending/movie/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTrending(data.results), setIsLoadedTrending(false) })
    .catch(err => { console.log(err), setIsLoadedTrending(true) })
    }, [apiKey])


  useEffect(() => {
    fetch(`${api}/movie/popular?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setMoviePopular(data.results), setIsLoadedMoviePopular(false) })
    .catch(err => { console.log(err)})
  }, [apiKey])


  useEffect(() => {
    fetch(`${api}/trending/tv/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvTrending(data.results), setIsLoadedTvTrending(false) })
    .catch(err => { console.log(err)})
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/tv/top_rated?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvTopRated(data.results), setIsLoadedTvTopRated(false) })
    .catch(err => { console.log(err)})
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/tv/on_the_air?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvOnAir(data.results), setIsLoadedTvOnAir(false) })
    .catch(err => { console.log(err)})
  }, [apiKey])  
  
  

  
  

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
