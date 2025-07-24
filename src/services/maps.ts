import { GOOGLE_PLACES_API_KEY } from '@env';
import { PredictionType } from '@src/types';

export const fetchPlaces = async (text: string): Promise<PredictionType[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${text}`
    );
    const data = await response.json();
    return data.predictions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPlaceDetails = async (placeId: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_PLACES_API_KEY}&place_id=${placeId}`
    );
    const data = await response.json();
    return data.result.geometry.location;
  } catch (error) {
    console.error(error);
    return null;
  }
}; 