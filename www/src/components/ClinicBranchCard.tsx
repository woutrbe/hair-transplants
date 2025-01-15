import { ChevronRight, Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import { Branch, Clinic } from "../content/types";
import { Badge } from "./ui/badge";
import StarRating from "./StarRating";

interface Props {
	clinic: Clinic;
	branch: Branch;
}

export default function ClinicBranchCard({ clinic, branch }: Props) {
	const allLanguages = Array.from(new Set(clinic.branches.flatMap(b => b.languages)));
	const methodsArray = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

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
							<div className="flex  space-x-2">
								<Globe className="h-4 w-4" />
								<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
							</div>
						</div>
						<div className="flex space-x-2">
							<MapPin className="h-4 w-4" />
							<span>{branch.location}, {branch.city}, {branch.country}</span>
						</div>
						<div className="flex items-center space-x-2">
							<MessageCircle className="h-4 w-4" />
							<div className="flex flex-wrap gap-1">
								{allLanguages.map((lang, index) => (
									<Badge key={index} variant="secondary">{lang}</Badge>
								))}
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<StarRating rating={clinic.review.avgScore} />
							<div className="text-sm text-muted-foreground">
								<a href={branch.review.source} target="_blank" className="hover:underline">{branch.review.score} stars, {branch.review.totalReviews} reviews</a>
							</div>
						</div>
						{methodsArray.length > 0 && <div className="flex items-center space-x-2">
							<Scissors className="h-4 w-4" />
							<div className="flex flex-wrap gap-1">
								{methodsArray.map((method, index) => (
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