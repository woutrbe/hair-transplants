import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

interface DoctorCardProps {
	name: string
	imageUrl: string
}

export function DoctorCard({ name, imageUrl }: DoctorCardProps) {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="relative aspect-square">
					<Image
						src={imageUrl}
						alt={`Dr. ${name}`}
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-4 h-24 flex items-center justify-center">
					<h3 className="text-lg font-semibold text-center line-clamp-3">Dr. {name}</h3>
				</div>
			</CardContent>
		</Card>
	)
}

