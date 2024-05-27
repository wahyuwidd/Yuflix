import { api } from '@/utils/api';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ScrollView, Text, FlatList } from 'react-native';



export default function Genre() {

  const [data, setData] = useState<GenreList[]>([]);

  useEffect(() => {
    fetch(`${api}/genre/movie/list?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}`)
    .then(response => response.json())
    .then(data => setData(data.genres))
  }, [])

  // console.log(data);
  const renderItem = ({ item, index }: { item: GenreList; index: number }) => (
    <View className="bg-[#222831] h-[90px] w-full mb-3 p-2">
      <Text className="text-white text-md font-bold">
        {item.name}
      </Text>
    </View>
  );
  

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
                  }}  >
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
          />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  
});
