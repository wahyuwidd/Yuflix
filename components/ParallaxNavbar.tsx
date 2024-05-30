import { useEffect, useState, type PropsWithChildren, type ReactElement } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import ToggleMenu from './home/ToggleMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { api, imageBaseUrl } from '@/utils/api';

type Props = PropsWithChildren<{
  currentPage: string
}>;

export default function ParallaxNavbar({
  children,
  currentPage
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY
  const colorScheme = useColorScheme() ?? 'light';

  const [Trending, setTrending] = useState<Movie[]>([]);
  const [MoviePopular, setMoviePopular] = useState<Movie[]>([]);
  const [TvTrending, setTvTrending] = useState<Tv[]>([]);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const newOpacity = scrollPosition > 100 ? 1 : 0;
    setOverlayOpacity(newOpacity);
  };

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
    <ThemedView style={styles.container}>
      <View style={[styles.overlayNav, { opacity: overlayOpacity }]} />
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: `#fff` },
          ]}
        >
          <View style={styles.overlay} />
          <ToggleMenu data={(currentPage === 'movies' ? Trending : currentPage === 'popular' ? MoviePopular : currentPage === 'tv' ? TvTrending : []) as any[]} />
          <LinearGradient
            className='z-20'
            colors={['rgba(21, 21, 21, 0.1)', 'rgba(21, 21, 21, 7)', ]}
            style={styles.LinierContainer}
          />
          <Image
            source={{
              uri: `${imageBaseUrl}${currentPage === 'movies' ? Trending[0]?.poster_path : currentPage === 'popular' ? MoviePopular[0]?.poster_path : currentPage === 'tv' ? TvTrending[0]?.poster_path : ''}`,
            }}
            style={styles.poster}
          />
        </Animated.View>
        <View className='bg-[#151515]' style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 530,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: '#151515',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151515',
    opacity: 0.6,
    zIndex: 1
  },
  overlayNav: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151515',
    height: 95,
    zIndex: 2
  },
  LinierContainer: {
    flex: 1,
    marginTop: 20
  },
  poster: {
    height: "100%",
    width: "100%",
    position: "absolute",
    
  },
});
