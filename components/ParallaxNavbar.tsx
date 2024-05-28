import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import ToggleMenu from './home/ToggleMenu';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  data: Movie[];
}>;

export default function ParallaxNavbar({
  children,
  headerImage,
  headerBackgroundColor,
  data
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // Sesuaikan dengan nilai yang sesuai untuk mengubah opacity
    const newOpacity = scrollPosition > 100 ? 1 : 0;
    setOverlayOpacity(newOpacity);
  };

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
            { backgroundColor: headerBackgroundColor[colorScheme] },
            // headerAnimatedStyle,
          ]}
        >
          <View style={styles.overlay} />
          <ToggleMenu data={data} />
          <LinearGradient
            // Button Linear Gradient
            className='z-20'
            colors={['rgba(21, 21, 21, 0.1)', 'rgba(21, 21, 21, 7)', ]}
            style={styles.LinierContainer}
          />
          {headerImage}
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
  }
});
