import { ChevronRight, Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import { Clinic } from "../content/types";
import StarRating from "./StarRating";
import { Badge } from "./ui/badge";

interface Props {
	clinic: Clinic;
}

export default function ClinicCard({ clinic }: Props) {
	const allLanguages = Array.from(new Set(clinic.branches.flatMap(b => b.languages)));
	const allMethods = Array.from(new Set(clinic.treatments.flatMap(t => t.method)));

	return (
		<div className="w-full group border">
			<div className="flex p-5">
				<div className="w-1/2">
					<div className="space-y-4">
						<h3>
							<a href={`/clinics/${clinic.slug}`} title={clinic.name} className="text-xl font-bold hover:underline">
								{clinic.name}
							</a>
						</h3>
						<div>
							<img
								src={`/clinics/${clinic.imagePath}`}
								alt={`${clinic.name} logo`}
								width={200}
								height={60}
								className="rounded-lg"
							/>
						</div>
					</div>
				</div>

				<div className="w-1/2">
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Globe className="h-4 w-4" />
								<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
							</div>
						</div>
						{clinic.branches.length === 1 && <div className="flex items-center space-x-2">
							<MapPin className="h-4 w-4" />
							<span>{clinic.branches[0].location}, {clinic.branches[0].city}, {clinic.branches[0].country}</span>
						</div>}
						<div className="flex items-center space-x-2">
							<MessageCircle className="h-4 w-4" />
							<div className="flex flex-wrap gap-1">
								{allLanguages.map((lang, index) => (
									<Badge key={index} variant="secondary">{lang}</Badge>
								))}
							</div>
						</div>
						<div className="space-y-2">
							<StarRating rating={clinic.review.avgScore} />
							<div className="text-sm text-muted-foreground">
								{clinic.review.avgScore} stars, {clinic.review.totalReviews} reviews
							</div>
						</div>
						{allMethods.length > 0 && <div className="flex items-center space-x-2">
							<Scissors className="h-4 w-4" />
							<div className="flex flex-wrap gap-1">
								{allMethods.map((method, index) => (
									<Badge key={index} variant="secondary">{method}</Badge>
								))}
							</div>
						</div>}
						<div>
							{/* <span className="font-semibold">Consultation:</span> {clinic.ConsultationPrice === 0 ? 'Free' : `${clinic.ConsultationPrice} ${clinic.local_currency}`} */}
							{clinic.consulationOnline && <Badge className="ml-2" variant="outline">Online Available</Badge>}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gray-50 p-5">
				<a href={`/clinics/${clinic.slug}`} className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
					Learn more about {clinic.name}
					<ChevronRight className="w-4 h-4" />
				</a>
			</div>
		</div>
	)
}