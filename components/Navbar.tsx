import React from 'react';
import { Link } from 'expo-router';
import { View, Image, Text, StyleSheet } from 'react-native';

interface CustomHeaderProps {
  children: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 40, }]}>
      <Image
        source={require('@/assets/images/logo-1.png')}
        style={{ width: 60, height: 60, marginRight: 1,  }}
      />
      <Link style={styles.textTitle} href={"/popular"}>Popular</Link>
      <Link style={styles.textTitle} href="/tvShows">Tv Show</Link>
      <Link style={styles.textTitle} href={"/anime"}>Movies</Link>
    </View>
  );
};

const styles = StyleSheet.create({
    textTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
})

export default CustomHeader;
