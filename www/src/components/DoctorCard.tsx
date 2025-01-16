import { Doctor } from '../content/types'

interface DoctorCardProps {
	doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
	return (
		<div className="border border-gray-300 rounded">
			<div className="aspect-square">
				<img
					src={doctor.img}
					alt={`Dr. ${doctor.name}`}
					className="object-cover"
				/>
			</div>

			<div className="p-4 space-y-2">
				<h3 className="text-lg font-semibold">Dr. {doctor.name}</h3>
			</div>
		</div>
	)
}

