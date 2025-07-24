import { useState, useEffect, useRef, useContext } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { PredictionType, PlaceDetailsType } from '@src/types';
import useDebounce from './useDebounce';
import { fetchPlaces, fetchPlaceDetails } from '../services/maps';
import { SearchHistoryContext } from '../context/SearchHistoryContext';
import useToast from './useToast';

interface UseSearchParams {
  onLocationSelect: (details: PlaceDetailsType | null) => void;
  setShowPredictions: (show: boolean) => void;
}

export const useSearch = ({ onLocationSelect, setShowPredictions }: UseSearchParams) => {
  const [search, setSearch] = useState<string>('');
  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { searchHistory, addToHistory, removeFromHistory } = useContext(SearchHistoryContext)!;
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(search, 800);
  const skipNextFetch = useRef<boolean>(false);
  const searchInputRef = useRef<TextInput>(null);

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
      const result = await fetchPlaces(text);
      setPredictions(result);
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

  return {
    search,
    setSearch,
    predictions,
    loading,
    showPredictions: true, // This is now managed by the parent
    setShowPredictions,
    searchHistory,
    onSelectPlace,
    removeFromHistory,
    onClearSearch,
    searchInputRef,
  };
}; 