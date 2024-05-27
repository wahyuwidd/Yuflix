import { StyleSheet, StatusBar, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ParallaxNavbar from '@/components/ParallaxNavbar';
import { useEffect, useState } from 'react';
import CardMovies from '@/components/home/CardMovies';
import CardPeople from '@/components/home/CardPeople';
import { useLocalSearchParams } from 'expo-router';


export default function HomeScreen() {
  const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY
  const { params } = useLocalSearchParams<{params: string}>();
  
  const [People, setPeople] = useState<People[]>([]);
  const [Trending, setTrending] = useState<Movie[]>([]);
  const [TopRated, setTopRated] = useState<Movie[]>([]);
  const [Upcoming, setUpcoming] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedPeople, setIsLoadedPeople] = useState(true);
  const [currentPage, setCurrentPage] = useState('movies');

  useEffect(() => {
    if(params != undefined){
      setCurrentPage(params!);
    }
  }, [params]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setTrending(data.results), setIsLoaded(false) })
    .catch(err => { console.log(err), setIsLoaded(true) })
    }, [apiKey])

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => { setTopRated(data.results), setIsLoaded(false) })
  .catch(err => { console.log(err), setIsLoaded(true) })
  }, [apiKey])
  
  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => { setUpcoming(data.results), setIsLoaded(false) })
  .catch(err => { console.log(err), setIsLoaded(true) })
  }, [apiKey])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setPeople(data.results), setIsLoadedPeople(false) })
    .catch(err => { console.log(err), setIsLoadedPeople(true) })
  }, [apiKey])

  const renderMoviesPage = () => (
    <>
      <Text style={styles.titlePoster}>People</Text>
      <CardPeople Poeple={People} isLoaded={isLoadedPeople} />
  
      <Text style={styles.titlePoster}>Trending Today</Text>
      <CardMovies Data={Trending} isLoaded={isLoaded} />
      
      <Text style={styles.titlePoster}>Top Rated</Text>
      <CardMovies Data={TopRated} isLoaded={isLoaded} />
  
      <Text style={styles.titlePoster}>Upcoming</Text>
      <CardMovies Data={Upcoming} isLoaded={isLoaded} />
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
              uri: "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2024/03/17/exhuma-11-022624-1075x1536jpg-20240317035509.jpg",
            }}
            style={styles.poster}
          />
        }
      > 
      <View>

      {currentPage === 'movies' && renderMoviesPage()}

      {currentPage === 'Popular' && renderMoviesPage()}

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
