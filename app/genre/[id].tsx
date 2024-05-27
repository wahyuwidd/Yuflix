import { View, Text, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router';
import { api } from '@/utils/api';

const GenreId = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const [idGenre,] = id!.split('-');
    const [data, setData] = useState<GenreId[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
      fetchData(page);
    }, [page]);

    const fetchData = async (page: number) => {
      if (loading) return;
  
      setLoading(true);
      try {
        const response = await fetch(`${api}/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}&with_genres=${idGenre}&page=${page}`);
        const result = await response.json();
        const data = result.results
        
        setData((prevData) => [...prevData, ...data]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    const loadMore = () => {
      setPage((prevPage) => prevPage + 1);
    };
  
    const renderFooter = () => {
      if (!loading) return null;
      return <ActivityIndicator style={styles.loading} />;
    };

    const renderItem = ({ item, index }: { item: GenreId, index: number }) => (
      <Link className="bg-[#222831] h-[90px] w-full mb-1" href={`/tv/detail/${item.id}`}>
      <View className="flex flex-wrap" key={index}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          className="h-[90px] w-[155px] mb-3"
        />
      </View>
      </Link>
    );

    useEffect(()=> {
      fetch(`${api}/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}&with_genres=${idGenre}`)
      .then(response => response.json())
      .then(data => setData(data.results))
    }, [idGenre])

  return (
    <View className=''>
      <FlatList
      data={data}
      numColumns={3}
      key={`flatlist-3`}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Link style={{ flex: 1, margin: 2 }} className='h-[170px] w-[115px] rounded-md mb-3' href={`/movies/detail/${item.id}`}>
        <View style={{ flex: 1, margin: 2 }}>
          {/* <View style={{
              backgroundColor: "#222831",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}  > */}
          <Image
                key={index}
                className="h-[170px] w-[115px] rounded-md mb-3"
                // placeholder={{ blurhash }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
              />
          {/* </View> */}
        </View>
        </Link>
      )}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
    </View>
  )
}
const styles = StyleSheet.create({
  loading: {
    paddingVertical: 20,
  },
});

export default GenreId