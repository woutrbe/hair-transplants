"use client"

import React from 'react'
import { Clinic } from '../content/types'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

export interface MapClinic {
  name: string;
  location: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

interface MapProps {
	clinics: Clinic[]
}

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 20,
  lng: 0
}

export default function GoogleMapsComponent({ clinics }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMlkH6wf6y2MYD-8877qdJCE29_7M6CGw" // Replace with your actual API key
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds()
    clinics.forEach(clinic => {
      console.log('clinic');
      console.log(clinic);
      const lat = parseFloat(clinic.lat.toString());
      const lng = parseFloat(clinic.lng.toString());
      console.log(lat);
      console.log(lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat, lng });
      }
    });
    map.fitBounds(bounds);
  }, [clinics])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    // No need to set map to null if it's not used
  }, [])

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {clinics.map((clinic, index) => {
            const lat = parseFloat(clinic.lat.toString());
            const lng = parseFloat(clinic.lng.toString());
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  title={clinic.name}
                />
              );
            }
            return null;
          })}
        </GoogleMap>
      ) : <></>}
    </div>
  )
};
