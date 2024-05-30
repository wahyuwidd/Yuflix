import { StatusBar, View } from 'react-native';
import ParallaxNavbar from '@/components/ParallaxNavbar';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import MoviesPage from '@/components/home/MoviePage';
import PopularPage from '@/components/home/PopularPage';
import TvPage from '@/components/home/TvShowPage';

export default function HomeScreen() {
  const { params } = useLocalSearchParams<{params: string}>();
  const [currentPage, setCurrentPage] = useState('movies');

  useEffect(() => {
    if(params != undefined){
      setCurrentPage(params!);
    }
  }, [params]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ParallaxNavbar currentPage={currentPage} > 
      <View>
          {currentPage === 'movies' && <MoviesPage />}
          {currentPage === 'popular' && <PopularPage />}
          {currentPage === 'tv' && <TvPage />}
      </View>
      </ParallaxNavbar>
    </>
  );
}
