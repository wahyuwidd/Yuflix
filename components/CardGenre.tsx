import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const CardGenre = ({ uri, style, placeholderComponent } : {uri:string, style:any, placeholderComponent:any}) => {
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
    <View style={[styles.imageContainer, style]}>
      {loading && !error && placeholderComponent}
      <Image
        source={{ uri }}
        className='rounded-md'
        style={StyleSheet.absoluteFill}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {error && (
        <View style={styles.errorContainer}>
          {placeholderComponent || <ActivityIndicator />}
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
});

export default CardGenre;
