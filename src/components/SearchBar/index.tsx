import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { PredictionType } from '@src/types';
import useDebounce from '@src/utils/useDebounce';
import { colors } from '@src/theme/colors';
import CrossIcon from '@src/assets/svgs/CrossIcon';

interface SearchBarProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
    const [search, setSearch] = useState('');
    const [predictions, setPredictions] = useState<PredictionType[]>([]);
    const debouncedSearch = useDebounce(search, 1000);

    useEffect(() => {
        if (debouncedSearch) {
            fetchPlaces(debouncedSearch);
        } else {
            setPredictions([]);
        }
    }, [debouncedSearch]);

    const fetchPlaces = async (text: string) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_PLACES_API_KEY}&input=${text}`
            );
            const data = await response.json();
            console.log(data);
            setPredictions(data.predictions);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelectPlace = async (placeId: string) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_PLACES_API_KEY}&place_id=${placeId}`
            );
            const data = await response.json();
            const { lat, lng } = data.result.geometry.location;
            onLocationSelect({ lat, lng });
            setSearch(data.result.name);
            setPredictions([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search your location"
                placeholderTextColor={colors.grey}
                value={search}
                onChangeText={setSearch}
            />
            {search.length > 0 && (
                <TouchableOpacity style={styles.crossIcon} onPress={() => setSearch('')}>
                    <CrossIcon size={20} fillColor={colors.grey} />
                </TouchableOpacity>
            )}
            {predictions.length > 0 && (
                <FlatList
                    style={styles.list}
                    data={predictions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSelectPlace(item.place_id)}>
                            <Text style={styles.itemText}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 3,
    },
    input: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 13,
        borderRadius: 5,
        color: colors.black,
        fontSize: 15
    },
    crossIcon: {
        padding: 10,
    },
    list: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 5,
    },
    itemText: {
        padding: 10,
    },
});

export default SearchBar; 