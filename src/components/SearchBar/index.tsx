import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { PredictionType } from '@src/types';
import useDebounce from '@src/utils/useDebounce';
import { colors } from '@src/theme/colors';
import CrossIcon from '@src/assets/svgs/CrossIcon';
import LocationPinIcon from '@src/assets/svgs/LocationPinIcon';

interface SearchBarProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
    showPredictions: boolean;
    setShowPredictions: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onLocationSelect,
    showPredictions,
    setShowPredictions,
}) => {
    const [search, setSearch] = useState('');
    const [predictions, setPredictions] = useState<PredictionType[]>([]);
    const debouncedSearch = useDebounce(search, 800);
    const skipNextFetch = useRef(false);


    console.log("showPredictions", showPredictions)
    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }
        if (debouncedSearch) {
            console.log("debouncedSearch--->", debouncedSearch)
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
            setShowPredictions(true);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelectPlace = async (placeId: string, description: string) => {
        Keyboard.dismiss();
        try {
            const selectedPrediction = predictions.find(p => p.place_id === placeId);

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_PLACES_API_KEY}&place_id=${placeId}`
            );
            const data = await response.json();
            const { lat, lng } = data.result.geometry.location;
            onLocationSelect({ lat, lng });
            skipNextFetch.current = true;
            setSearch(description);
            if (selectedPrediction) {
                setPredictions([selectedPrediction]);
            } else {
                setPredictions([]);
            }
            setShowPredictions(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search your location"
                        placeholderTextColor={colors.grey}
                        value={search}
                        onChangeText={setSearch}
                        onFocus={() => setShowPredictions(true)}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity style={styles.crossIcon} onPress={() => setSearch('')}>
                            <CrossIcon size={20} fillColor={colors.grey} />
                        </TouchableOpacity>
                    )}
                </View>
                {showPredictions && (
                    <FlatList
                        style={styles.list}
                        data={predictions}
                        keyExtractor={(item) => item.place_id}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.predictionItem}
                                onPress={() => onSelectPlace(item.place_id, item.description)}
                            >
                                <LocationPinIcon size={30} fillColor={colors.primary} />
                                <View style={styles.predictionTextContainer}>
                                    <Text style={styles.mainText}>{item.structured_formatting.main_text}</Text>
                                    <Text style={styles.secondaryText}>{item.structured_formatting.secondary_text}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            search.length > 0 ? (
                                <Text style={styles.itemText}>No such place found</Text>
                            ) : null
                        }
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        zIndex: 1,
    },
    inputContainer: {
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
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 5,
        elevation: 3,
    },
    predictionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    predictionTextContainer: {
        marginLeft: 10,
    },
    mainText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '500',
    },
    secondaryText: {
        color: colors.grey,
        fontSize: 13,
    },
    itemText: {
        padding: 10,
    },
});

export default SearchBar; 