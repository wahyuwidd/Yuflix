import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

const DetailPerson = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    console.log(id);
    
    return (
        <View className='bg-[#151515] h-full'>
            
        </View>
    )
}

export default DetailPerson