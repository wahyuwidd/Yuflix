import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const CardGenre = ({ uri} : {uri:string, }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={[styles.imageContainer,styles.image]}>
      {loading && !error && <View style={styles.placeholder}>
              <Image className="h-[170px] w-[115px] rounded-md" source={require('@/assets/images/logo.png')} />
            </View>}
      <Image
        source={{ uri }}
        className='rounded-md'
        style={StyleSheet.absoluteFill}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {error && (
        <View style={styles.errorContainer}>
          {<View style={styles.placeholder}>
              <Image className="h-[170px] w-[115px] rounded-md" source={require('@/assets/images/logo.png')} />
            </View> || <ActivityIndicator />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 170,
    width: 115,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    width: 115,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});

export default CardGenre;
