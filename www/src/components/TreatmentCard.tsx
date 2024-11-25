import { Star, MapPin, Globe, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

import { Treatment } from "../content/types";

export default function TreatmentCard({
	treatment
}: {
	treatment: Treatment;
}) {
	return (
		<div key={treatment.clinic.name} className="bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-6">
				{/* Section 0: Header */}
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-2xl font-bold text-primary">{treatment.clinic.name}</h2>
					{treatment.badges.length > 0 && (
						<div className="flex gap-2">
							{treatment.badges.map((badge) => (
								<Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
									{badge}
								</Badge>
							))}
						</div>
					)}
				</div>

				<div className="grid grid-cols-4 gap-6">
					{/* Section 1: Metadata */}
					<div className="col-span-4 sm:col-span-1 flex sm:flex-col items-center justify-center sm:items-start gap-4">
						<Image
							src={`/clinics/${treatment.clinic.imagePath}`}
							alt={`${treatment.clinic.name} logo`}
							width={200}
							height={60}
							className="rounded-lg"
						/>
						<div>
						</div>
					</div>

					{/* Section 2: Reviews */}
					<div className="col-span-4 sm:col-span-1 flex flex-col justify-center items-center ">
						<div className="flex items-center gap-1 mb-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={`w-6 h-6 ${star <= Math.floor(treatment.review.score)
										? 'text-yellow-400 fill-yellow-400'
										: star === Math.ceil(treatment.review.score) && treatment.review.score % 1 !== 0
											? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]'
											: 'text-gray-200 fill-gray-200'
										}`}
								/>
							))}
						</div>
						<div className="text-sm text-muted-foreground">
							<a href={treatment.review.source} target="blank" className="hover:underline">{treatment.review.score} stars, {treatment.review.totalReviews} reviews</a>
						</div>
					</div>

					{/* Section 3: Price per Graft and Grafts */}
					<div className="col-span-4 sm:col-span-1 flex flex-col justify-center items-center">
						<div className="text-2xl font-bold text-primary mb-1">{treatment.grafts.from} grafts</div>
						<div className="text-sm text-muted-foreground">
							Price per Graft ${(treatment.price.usd_price / treatment.grafts.from).toFixed(5)}
						</div>
					</div>

					{/* Section 4: Total Price */}
					<div className="col-span-4 sm:col-span-1 flex flex-col justify-center items-center">
						<div className="text-2xl font-bold text-primary mb-1">${treatment.price.usd_price.toLocaleString()}</div>
						<div className="text-sm text-muted-foreground">
							{treatment.price.local_currency}{treatment.price.local_price.toLocaleString()}
						</div>
					</div>
				</div>
			</div>

			{/* Footer with CTA button */}
			<div className="px-6 py-4 bg-gray-50 flex space-y-4 md:space-y-0 flex-col md:flex-row md:justify-between md:items-center">
				<div className="gap-1 text-muted-foreground text-sm space-y-2">
					<div className="flex items-center mb-1">
						<MapPin className="w-4 h-4 mr-2" />
						<span>{treatment.clinic.city}, {treatment.clinic.country}</span>
					</div>

					<div className="flex items-center">
						<Globe className="w-4 h-4 mr-2" />
						<div className="flex gap-1">
							{treatment.clinic.languages.join(', ')}
						</div>
					</div>
				</div>

				<a href={treatment.clinic.url} target="blank" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
					Book Consultation
					<ChevronRight className="w-4 h-4" />
				</a>
			</div>
		</div>
	)
}