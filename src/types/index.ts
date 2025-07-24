export interface PredictionType {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export interface PlaceDetailsType {
  name: string;
  rating: number;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: { photo_reference: string }[];
  formatted_phone_number?: string;
}

export interface CoordinatesType {
  latitude: number;
  longitude: number;
}
