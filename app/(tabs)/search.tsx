import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { Link } from "expo-router";


export default function TabTwoScreen() {
  const [movies, setMovies] = useState<Search[]>([]);
  const [text, setText] = useState("");
  const [data, setData] = useState<Tv[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    fetchData(page);
    fetchDataSearch(page);
  }, [page]);

  const fetchData = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}&page=${page}`
      );
      const result = await response.json();
      const data: Tv[] = result.results
      const uniqueData = Object.values(
        data.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {} as { [key: number]: Tv })
    );
      setData((prevData) => [...prevData, ...uniqueData]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchDataSearch = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}&query=${text}&page=${page}`
      );
      const result = await response.json();
      const data = result.results
      setMovies((prevData) => [...prevData, ...data]);
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

  const renderHeader = () => {
    return(
      <Text className='text-white pl-3 my-3 font-bold text-xl'>Airing Today</Text>
    )
  }
  const renderHeaderSearch = (data:string) => {
    return(
      <Text className='text-white pl-3 my-3 font-bold text-xl'>Result for '{data}'</Text>
    )
  }

  const renderItem = ({ item, index }: { item: Tv, index: number }) => (
    <Link className="bg-[#222831] h-[90px] w-full mb-1" href={`/tv/detail/${item.id}`}>
    <View className="flex flex-row" key={index}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        className="h-[90px] w-[155px] mb-3"
        placeholder={blurhash}
      />
      <View className="bg-[#222831] h-[90px] w-full mr-10">
        <Text className="text-white pl-4 mt-4 text-md font-bold w-[155px]">
          {item.name}
        </Text>
        <View className="absolute w-full mt-8 ml-[190px]">
          <Feather name="play-circle" size={24} color="white" />
        </View>
      </View>
    </View>
    </Link>
  );
  const renderItemSearch = ({ item, index }: { item: Search, index: number }) => (
    <Link className="bg-[#222831] h-[90px] w-full mb-1" href={ item.media_type === 'movie' ? `/movies/detail/${item.id}` : item.media_type === 'tv' ? `/tv/detail/${item.id}`: `/person/detail/${item.id}`}>
    <View className="flex flex-row" key={index}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        className="h-[90px] w-[155px] mb-3"
        placeholder={blurhash}
      />
      <View className="bg-[#222831] h-[90px] w-full mr-10">
        <Text className="text-white pl-4 mt-2 text-md font-bold w-[155px]">
          {truncateTitle(item.media_type === 'movie' ? item.title : item.name, 5)}
        </Text>
        <Text className="text-white pl-4 mt-2 text-sm w-[155px]">
          {item.media_type}
        </Text>
        <View className="absolute w-full mt-8 ml-[190px]">
          <Feather name="play-circle" size={24} color="white" />
        </View>
      </View>
    </View>
    </Link>
  );

  const renderEmptyComponent = () => (
    <Text className="text-white text-md text-center mt-40">No Results</Text>
  );

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.EXPO_PUBLIC_TMBD_API_KEY}&query=${text}`)
    .then((response) => response.json())
    .then((data) => setMovies(data.results))
  }, [text])
  useEffect(() => {
    if (text === '') {
      setIsSearchFocused(false);
    } else (
      setIsSearchFocused(true)
    )
  }, [text]);
  const truncateTitle = (text: string, wordLimit:number) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (
    <View className="bg-[#151515] w-full h-full">
      <View className="mt-8">
        <View className="absolute z-20 mt-6 ml-8">
          <Feather name="search" size={20} color="grey" />
        </View>
        {
          !isSearchFocused ? <></> : <View className="absolute items-end justify-end w-full pr-[60px] z-20 mt-6 ml-8">
          <Feather onPress={() => setText('')} name="x" size={20} color="grey" />
        </View>
        }
        <TextInput
          style={styles.input}
          placeholder="Search for Tv Shows, Movies, Peopled, More..."
          onChangeText={setText}
          value={text}
          className="rounded-md bg-[#222831] text-[#B5C0D0]"
          placeholderTextColor={"#B5C0D0"}
        />
        <View className="mb-[130px]">
          {!isSearchFocused ? (
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={true}
            initialNumToRender={10} 
            maxToRenderPerBatch={10}
            windowSize={5}
          />
          ): (
            <FlatList
            data={movies}
            renderItem={renderItemSearch}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMore}
            ListHeaderComponent={renderHeaderSearch(text)}
            ListEmptyComponent={renderEmptyComponent}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={true}
            initialNumToRender={10} 
            maxToRenderPerBatch={10}
            windowSize={5}
          />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    paddingLeft: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    height: 170,
    width: 115,
    borderRadius: 8,
    marginRight: 10,
  },
  text: {
    color: "white",
    flex: 1,
  },
  loading: {
    paddingVertical: 20,
  },
});
