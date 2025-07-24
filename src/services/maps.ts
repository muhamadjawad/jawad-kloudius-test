import { GOOGLE_PLACES_API_KEY } from '@env';
import { PredictionType, PlaceDetailsType } from '@src/types';

export const fetchPlaces = async (text: string): Promise<PredictionType[]> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${text}`
    );
    const data = await response.json();
    // if (data.status !== 'OK') {
    //   throw new Error(data.error_message || 'Failed to fetch places');
    // }
    return data.predictions;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId: string): Promise<PlaceDetailsType | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_PLACES_API_KEY}&place_id=${placeId}&fields=name,rating,formatted_address,geometry,photos,formatted_phone_number`
    );
    const data = await response.json();
    // if (data.status !== 'OK') {
    //   throw new Error(data.error_message || 'Failed to fetch place details');
    // }
    return data.result;
  } catch (error) {
    // console.error(errors);
    throw error;
  }
}; 