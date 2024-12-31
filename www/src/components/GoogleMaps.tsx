import React from 'react'
import { Clinic } from '../content/types'

interface MapProps {
	clinics: Clinic[]
}

export default function GoogleMapsComponent({ clinics }: MapProps) {
	return (
		<div>
			<h1 className="text-4xl md:text-5xl leading-xl font-bold text-gray-800 mb-4">Clinics</h1>
			<ul>
				{clinics.map((clinic, index) => (
					<li key={index} className="mb-4">
						<h2 className="text-2xl font-bold">{clinic.name}</h2>
						<p>{clinic.location}, {clinic.city}, {clinic.country}</p>
					</li>
				))}
			</ul>
		</div>
	)
}