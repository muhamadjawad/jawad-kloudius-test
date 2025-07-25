import React from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ActivityIndicator, Dimensions, Pressable } from 'react-native';
import PredictionItem from '@src/components/PredictionItem';
import { PlaceDetailsType } from '@src/types';
import { colors } from '@src/theme/colors';
import { fonts } from '@src/theme/fonts';
import CrossIcon from '@src/assets/svgs/CrossIcon';
import HistoryItem from '@src/components/HistoryItem';
import { useSearch } from '@src/hooks/useSearch';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const LIST_MAX_HEIGHT = SCREEN_HEIGHT * 0.4;

interface SearchBarProps {
    onLocationSelect: (details: PlaceDetailsType | null) => void;
    showPredictions: boolean;
    setShowPredictions: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, showPredictions, setShowPredictions }) => {
    const {
        search,
        setSearch,
        predictions,
        loading,
        searchHistory,
        onSelectPlace,
        removeFromHistory,
        onClearSearch,
        searchInputRef,
    } = useSearch({ onLocationSelect, setShowPredictions });



    console.log("predictions", predictions)
    return (
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {showPredictions ? (
                        <TextInput
                            ref={searchInputRef}
                            style={styles.input}
                            placeholder="Search your location"
                            placeholderTextColor={colors.grey}
                            value={search}
                            onChangeText={setSearch}
                            onFocus={() => setShowPredictions(true)}
                            autoFocus
                        />
                    ) : (
                        <Pressable style={{ width: '100%' }} onPress={() => setShowPredictions(true)}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[styles.input, {
                                    paddingTop: 15,
                                    color: search.length > 0 ? colors.primary : colors.grey,
                                }]}>
                                {search || "Search your location"}
                            </Text>
                        </Pressable>
                    )}


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
        fontSize: 15,
        fontFamily: fonts.regular,

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
        fontFamily: fonts.regular,
    },
});

export default SearchBar; 