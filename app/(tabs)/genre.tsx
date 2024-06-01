import { api } from '@/utils/api';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, View, ScrollView, Text, FlatList, RefreshControl } from 'react-native';

export default function Genre() {
  const [data, setData] = useState<GenreList[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${api}/genre/movie/list?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`);
      const result = await response.json();
      setData(result.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGenres().then(() => setRefreshing(false));
  }, []);


  return (
    <>
      <View className="bg-[#151515] ">
        <Text className="text-white text-center mt-[60px] font-bold text-sm mb-5">
          All Genres
        </Text>
      </View>
      <View className="bg-[#151515] mb-[100px]">
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 2 }}>
              <View style={{
                backgroundColor: "#222831",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Link className='p-[40]' href={`/genre/${item.id}-${item.name}`}>
                  <Text
                    style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    {item.name}
                  </Text>
                </Link>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
