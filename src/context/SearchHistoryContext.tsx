import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PredictionType } from '@src/types';

interface SearchHistoryContextType {
  searchHistory: PredictionType[];
  addToHistory: (item: PredictionType) => void;
  removeFromHistory: (placeId: string) => void;
}

export const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

interface SearchHistoryProviderProps {
  children: ReactNode;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<PredictionType[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Failed to load search history.', error);
      }
    };
    loadHistory();
  }, []);

  const saveHistory = async (history: PredictionType[]) => {
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save search history.', error);
    }
  };

  const addToHistory = (item: PredictionType) => {
    const newHistory = [item, ...searchHistory.filter((h) => h.place_id !== item.place_id)].slice(0, 40);
    setSearchHistory(newHistory);
    saveHistory(newHistory);
  };

  const removeFromHistory = (placeId: string) => {
    const newHistory = searchHistory.filter((h) => h.place_id !== placeId);
    setSearchHistory(newHistory);
    saveHistory(newHistory);
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addToHistory, removeFromHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}; 