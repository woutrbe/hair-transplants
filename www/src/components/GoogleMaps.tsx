import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

interface MapProps {
    clinics: {
        ClinicName: string
        Location: string
        City: string
        Country: string
        lat: number
        lng: number
      }[]
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
    return(
        <div>
            <h1 className="text-4xl md:text-5xl leading-xl font-bold text-gray-800 mb-4">Clinics</h1>
            <ul>
                {clinics.map((clinic, index) => (
                <li key={index} className="mb-4">
                    <h2 className="text-2xl font-bold">{clinic.ClinicName}</h2>
                    <p>{clinic.Location}, {clinic.City}, {clinic.Country}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}