import { Stack, useLocalSearchParams } from "expo-router";


export default function GenreLayout() {
    const { id } = useLocalSearchParams<{id: string}>();
    const [,titleGenre] = id!.split('-');
    
    return (
        <Stack>
            <Stack.Screen name='[id]' options={{ headerShown: true, headerTitle: `${titleGenre}`, headerTintColor: "white" }} />
        </Stack>
    )
}