import { Doctor } from '../content/types'

interface DoctorCardProps {
	doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
	return (
		<div className="border border-gray-300 rounded">
			<div className="relative aspect-square">
				<img
					src={doctor.img}
					alt={`Dr. ${doctor.name}`}
					className="object-cover"
				/>
			</div>
			<div className="p-4 h-24 flex items-center justify-center">
				<h3 className="text-lg font-semibold text-center line-clamp-3">Dr. {doctor.name}</h3>
			</div>
		</div>
	)
}

