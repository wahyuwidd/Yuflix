import { StyleSheet, StatusBar, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ParallaxNavbar from '@/components/ParallaxNavbar';
import { useEffect, useState } from 'react';
import CardMovies from '@/components/home/CardMovies';
import CardPeople from '@/components/home/CardPeople';
import { useLocalSearchParams } from 'expo-router';
import { api, imageBaseUrl } from '@/utils/api';
import CardTv from '@/components/home/CardTv';


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
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedPeople, setIsLoadedPeople] = useState(true);
  const [currentPage, setCurrentPage] = useState('movies');

  useEffect(() => {
    if(params != undefined){
      setCurrentPage(params!);
    }
  }, [params]);

  useEffect(() => {
    fetch(`${api}/trending/movie/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTrending(data.results), setIsLoaded(false) })
    .catch(err => { console.log(err), setIsLoaded(true) })
    }, [apiKey])

  useEffect(() => {
  fetch(`${api}/movie/top_rated?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => { setTopRated(data.results), setIsLoaded(false) })
  .catch(err => { console.log(err), setIsLoaded(true) })
  }, [apiKey])
  
  useEffect(() => {
  fetch(`${api}/movie/upcoming?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => { setUpcoming(data.results), setIsLoaded(false) })
  .catch(err => { console.log(err), setIsLoaded(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/trending/person/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setPeople(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])
  
  useEffect(() => {
    fetch(`${api}/person/popular?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setPeoplePopular(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/movie/popular?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setMoviePopular(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/tv/popular?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvPopular(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/trending/tv/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvTrending(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/tv/top_rated?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvTopRated(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`${api}/tv/on_the_air?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTvOnAir(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])
  
  const renderMoviesPage = () => (
    <>
      <Text style={styles.titlePoster}>Top Cast</Text>
      <CardPeople Poeple={People} isLoaded={isLoadedPeople} />
  
      <Text style={styles.titlePoster}>Trending Today</Text>
      <CardMovies Data={Trending} isLoaded={isLoaded} isTrending={true} />
      
      <Text style={styles.titlePoster}>Top Rated</Text>
      <CardMovies Data={TopRated} isLoaded={isLoaded} isTrending={false} />
  
      <Text style={styles.titlePoster}>Upcoming</Text>
      <CardMovies Data={Upcoming} isLoaded={isLoaded} isTrending={false} />
    </>
  );

  const renderPopularPage = () => (
    <>
      <Text style={styles.titlePoster}>Popular Cast</Text>
      <CardPeople Poeple={PeoplePopular} isLoaded={isLoadedPeople} />
  
      <Text style={styles.titlePoster}>Popular Movies</Text>
      <CardMovies Data={MoviePopular} isLoaded={isLoaded} isTrending={true} />
      
      <Text style={styles.titlePoster}>Popular TV</Text>
      <CardTv Data={TvPopular} isLoaded={isLoaded} isTrending={false} />
    </>
  );

  const renderTvPage = () => (
    <>
      <Text style={styles.titlePoster}>Top Cast</Text>
      <CardPeople Poeple={People} isLoaded={isLoadedPeople} />
  
      <Text style={styles.titlePoster}>Trending Today</Text>
      <CardTv Data={TvTrending} isLoaded={isLoaded} isTrending={true} />
      
      <Text style={styles.titlePoster}>Top Rated</Text>
      <CardTv Data={TvTopRated} isLoaded={isLoaded} isTrending={false} />

      <Text style={styles.titlePoster}>On The Air</Text>
      <CardTv Data={TvOnAir} isLoaded={isLoaded} isTrending={false} />
    </>
  );

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
      data={MoviePopular}
      > 
      <View>

      {currentPage === 'movies' && renderMoviesPage()}
      {currentPage === 'popular' && renderPopularPage()}
      {currentPage === 'tv' && renderTvPage()}

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
