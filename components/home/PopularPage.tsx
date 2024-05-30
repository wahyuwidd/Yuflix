import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import CardMovies from './CardMovies';
import CardPeople from './CardPeople';
import {Text, StyleSheet} from 'react-native';
import SkeletonCardHome from './Skeleton';
import SkeletonCardPeople from './SkeletonPeople';
import CardTv from './CardTv';

const PopularPage = () => {
    const [isLoadedPopularPeople, setIsLoadedPopularPeople] = useState(true);
    const [isLoadedMoviePopular, setIsLoadedMoviePopular] = useState(true);
    const [isLoadedTvPopular, setIsLoadedTvPopular] = useState(true);

    const [PeoplePopular, setPeoplePopular] = useState<People[]>([]);
    const [MoviePopular, setMoviePopular] = useState<Movie[]>([]);
    const [TvPopular, setTvPopular] = useState<Tv[]>([]);

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
        fetchData(`${api}/person/popular?api_key=${apiKey}`, setPeoplePopular, setIsLoadedPopularPeople);
        fetchData(`${api}/movie/popular?api_key=${apiKey}`, setMoviePopular, setIsLoadedMoviePopular);
        fetchData(`${api}/tv/popular?api_key=${apiKey}`, setTvPopular, setIsLoadedTvPopular);
    }, [apiKey]);

    return(
        <>
            <Text style={styles.titlePoster}>Popular Cast</Text>
            {isLoadedPopularPeople ? (
                <SkeletonCardPeople />
            ) : (
                <CardPeople Poeple={PeoplePopular} />
            )}
            
            <Text style={styles.titlePoster}>Popular Movies</Text>
            {isLoadedMoviePopular ? (
                <SkeletonCardHome />
            ) : (
                <CardMovies Data={MoviePopular} isTrending={true} />
            )}
            
            <Text style={styles.titlePoster}>Popular TV</Text>
            {isLoadedTvPopular ? (
                <SkeletonCardHome />
            ) : (
                <CardTv Data={TvPopular} isTrending={false} />
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

export default PopularPage