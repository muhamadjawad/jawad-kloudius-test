import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import PredictionItem from '@src/components/PredictionItem';
import { PredictionType, PlaceDetailsType } from '@src/types';
import useDebounce from '@src/utils/useDebounce';
import { colors } from '@src/theme/colors';
import CrossIcon from '@src/assets/svgs/CrossIcon';
import { fetchPlaces, fetchPlaceDetails } from '@src/services/maps';
import { SearchHistoryContext } from '@src/context/SearchHistoryContext';
import HistoryItem from '@src/components/HistoryItem';
import useToast from '@src/hooks/useToast';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const LIST_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

interface SearchBarProps {
    onLocationSelect: (details: PlaceDetailsType | null) => void;
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
    const [loading, setLoading] = useState(false);
    const { searchHistory, addToHistory, removeFromHistory } = useContext(SearchHistoryContext)!;
    const { showToast } = useToast();
    const debouncedSearch = useDebounce(search, 800);
    const skipNextFetch = useRef(false);
    const searchInputRef = useRef<TextInput>(null);

    console.log("predictions", predictions)

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }
        if (debouncedSearch) {
            handleFetchPlaces(debouncedSearch);
        } else {
            setPredictions([]);
        }
    }, [debouncedSearch]);

    const handleFetchPlaces = async (text: string) => {
        setLoading(true);
        try {
            const predictions = await fetchPlaces(text);
            setPredictions(predictions);
        } catch (error) {
            showToast('Failed to fetch places. Please try again.');
        } finally {
            setLoading(false);
            setShowPredictions(true);
        }
    };

    const onSelectPlace = async (placeId: string, description: string) => {
        Keyboard.dismiss();

        try {
            const details = await fetchPlaceDetails(placeId);
            if (details) {
                onLocationSelect(details);
            }
        } catch (error) {
            showToast('Failed to fetch place details');
            onLocationSelect(null);
        }

        const clickedItem =
            predictions.find((p) => p.place_id === placeId) ||
            searchHistory.find((h) => h.place_id === placeId);

        if (clickedItem) {
            addToHistory(clickedItem);
            skipNextFetch.current = true;
            setSearch(clickedItem.structured_formatting.main_text);
            setPredictions([clickedItem]);
        } else {
            // Fallback for safety
            skipNextFetch.current = true;
            setSearch(description);
            setPredictions([]);
        }

        setShowPredictions(false);
    };

    const onClearSearch = () => {
        setSearch('');
        setPredictions([]);
        searchInputRef.current?.focus();
    };

    return (
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={searchInputRef}
                        style={styles.input}
                        placeholder="Search your location"
                        placeholderTextColor={colors.grey}
                        value={search}
                        onChangeText={setSearch}
                        onFocus={() => setShowPredictions(true)}
                    />
                    {loading ? (
                        <ActivityIndicator style={styles.loader} size="small" color={colors.primary} />
                    ) : (
                        search.length > 0 && (
                            <TouchableOpacity style={styles.crossIcon} onPress={onClearSearch}>
                                <CrossIcon size={20} fillColor={colors.grey} />
                            </TouchableOpacity>
                        )
                    )}
                </View>
                {showPredictions && (
                    <FlatList
                        style={styles.list}
                        data={search.length > 0 ? predictions : searchHistory}
                        keyExtractor={(item) => item.place_id}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item, index }) => {
                            const isLast = index === (search.length > 0 ? predictions.length - 1 : searchHistory.length - 1);
                            return search.length > 0 ? (
                                <PredictionItem item={item} onPress={onSelectPlace} isLast={isLast} />
                            ) : (
                                <HistoryItem item={item} onPress={onSelectPlace} onRemove={removeFromHistory} isLast={isLast} />
                            );
                        }}
                        ListEmptyComponent={
                            search.length > 0 && !loading ? (
                                <View style={styles.emptyComponent}>
                                    <Text style={styles.emptyText}>No such place found</Text>
                                </View>
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
    loader: {
        padding: 10,
    },
    list: {
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 5,
        elevation: 3,
        maxHeight: LIST_MAX_HEIGHT,
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
    emptyComponent: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: colors.grey,
        fontSize: 16,
    },
});

export default SearchBar; 