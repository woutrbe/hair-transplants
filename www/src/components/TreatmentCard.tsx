import { MapPin, ChevronRight, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import { TreatmentWithClinic } from "../content/types";
import StarRating from './StarRating';

export default function TreatmentCard({
	treatment
}: {
	treatment: TreatmentWithClinic;
}) {
	return (
		<div key={treatment.clinic.name} className="bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-6">
				{/* Section 0: Header */}
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-2xl font-bold text-primary">{treatment.clinic.name}</h2>
					<div className="flex gap-2">
						<Badge variant="secondary" className="bg-primary/10 text-primary">
							{treatment.method}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-6">
					{/* Section 1: Metadata */}
					<div className="col-span-4 sm:col-span-1 flex sm:flex-col items-center justify-center sm:items-start gap-4">
						<img
							src={`/clinics/${treatment.clinic.imagePath}`}
							alt={`${treatment.clinic.name} logo`}
							width={200}
							height={60}
							className="rounded-lg"
						/>
					</div>

					{/* Section 2: Reviews */}
					<div className="col-span-4 sm:col-span-1 flex flex-col justify-center items-center ">
						<div className="mb-2">
							<StarRating rating={treatment.clinic.review.score} />
						</div>
						<div className="text-sm text-muted-foreground">
							<a href={treatment.clinic.review.source} target="blank" className="hover:underline">{treatment.clinic.review.score} stars, {treatment.clinic.review.totalReviews} reviews</a>
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
						<MessageCircle className="w-4 h-4 mr-2" />
						<div className="flex gap-1">
							{treatment.clinic.languages.join(', ')}
						</div>
					</div>
				</div>

				<a href={treatment.clinic.url} target="blank" className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
					Book Consultation
					<ChevronRight className="w-4 h-4" />
				</a>
			</div>
		</div>
	)
}