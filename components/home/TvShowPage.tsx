import CardPeople from "./CardPeople";
import CardTv from "./CardTv";
import SkeletonCardHome from "./Skeleton";
import SkeletonCardPeople from "./SkeletonPeople";
import { StyleSheet, Text } from "react-native";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";


const TvPage = () => {
    const [isLoadedPeople, setIsLoadedPeople] = useState(true);
    const [isLoadedTvTrending, setIsLoadedTvTrending] = useState(true);
    const [isLoadedTvTopRated, setIsLoadedTvTopRated] = useState(true);
    const [isLoadedTvOnAir, setIsLoadedTvOnAir] = useState(true);
    const [People, setPeople] = useState<People[]>([]);
    const [TvTrending, setTvTrending] = useState<Tv[]>([]);
    const [TvTopRated, setTvTopRated] = useState<Tv[]>([]);
    const [TvOnAir, setTvOnAir] = useState<Tv[]>([]);
    const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY;

    useEffect(() => {
        const fetchData = async (url: string, setData: any, setIsLoaded: any) => {
            try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.results);
            setIsLoaded(false);
            } catch (error) {
            console.error(error);
            setIsLoaded(false);
        }};
        fetchData(`${api}/trending/person/day?api_key=${apiKey}`, setPeople, setIsLoadedPeople);
        fetchData(`${api}/trending/tv/day?api_key=${apiKey}`, setTvTrending, setIsLoadedTvTrending);
        fetchData(`${api}/tv/top_rated?api_key=${apiKey}`, setTvTopRated, setIsLoadedTvTopRated);
        fetchData(`${api}/tv/on_the_air?api_key=${apiKey}`, setTvOnAir, setIsLoadedTvOnAir);
    }, [apiKey]);
    
    return(
        <>
            <Text style={styles.titlePoster}>Top Cast</Text>
            {isLoadedPeople ? (
                <SkeletonCardPeople />
            ) : (
                <CardPeople Poeple={People} />
            )}

            <Text style={styles.titlePoster}>Trending Today</Text>
            {isLoadedTvTrending ? (
                <SkeletonCardHome />
            ) : (
                <CardTv Data={TvTrending} isTrending={true} />
            )}

            <Text style={styles.titlePoster}>Top Rated</Text>
            {isLoadedTvTopRated ? (
                <SkeletonCardHome />
            ) : (
                <CardTv Data={TvTopRated} isTrending={false} />
            )}

            <Text style={styles.titlePoster}>On The Air</Text>
            {isLoadedTvOnAir ? (
                <SkeletonCardHome />
            ) : (
                <CardTv Data={TvOnAir} isTrending={false} />
            )}
        </>
    )
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    poster: {
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    titlePoster: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 17,
        marginBottom: 5
    }
});

export default TvPage