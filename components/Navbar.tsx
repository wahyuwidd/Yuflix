import React from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  children: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children }) => {
  const router = useRouter();
  const [params, setParams] = React.useState('movies');
  const navigation = useNavigation();

  const handleClick = (title: string) => {
    const currentState = navigation.getState();
    const currentParams = (currentState! as any).params;
    navigation.setParams({ ...currentParams, params: `${title}` });
  };
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 40, }]}>
      <Image
        source={require('@/assets/images/logo-1.png')}
        style={{ width: 60, height: 60, marginRight: 1,  }}
      />
      <Text onPress={() => handleClick('movies')} style={styles.textTitle} >Movies</Text>
      <Text onPress={() => handleClick('Popular')} style={styles.textTitle} >Popular</Text>
      <Text onPress={() => handleClick('Tv Show')} style={styles.textTitle} >Tv Show</Text>
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
