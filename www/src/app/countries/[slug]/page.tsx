import { Metadata } from "next";
import { getClinics, getCountries, getCountry } from "../../../content/types";
import { Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import StarRating from "../../../components/StarRating";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GoogleMapsComponent from "@/components/GoogleMaps"

interface Props {
	params: {
		slug: string;
	}
}

export async function generateStaticParams() {
	const countries = await getCountries();

	return countries.map(country => ({
		slug: country.slug,
	}))
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const country = await getCountry(props.params.slug);

	return {
		title: `Hair transplant clinics in ${country.name}`,
		description: `Hair transplant clinics in ${country.name}`,

		alternates: {
			canonical: `${process.env.URL}/countries/${props.params.slug}`,
		}
	}
}

export default async function CountryPage(props: Props) {
	const country = await getCountry(props.params.slug);

	const allClinics = await getClinics();
	const filteredByCountry = allClinics.filter(c => c.countryCode === country.cc);

	return (
		<div className="mb-20">
			<h2 className="font-bold text-3xl mb-5">Hair transplant clinics in {country.name}</h2>

			{/* Search and Filter */}
			<div className="mb-8 flex flex-col sm:flex-row gap-4">
				<Input
					placeholder="Search clinics..."
					className="flex-grow"
				/>
				<Select>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Filter by specialty" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Specialties</SelectItem>
						<SelectItem value="FUE">FUE</SelectItem>
						<SelectItem value="FUT">FUT</SelectItem>
						<SelectItem value="PRP">PRP</SelectItem>
						<SelectItem value="Beard Transplant">Beard Transplant</SelectItem>
						<SelectItem value="Eyebrow Transplant">Eyebrow Transplant</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredByCountry.map((clinic, index) => {
					const languageArray = clinic.languages;
					const methodsArray = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

					return (
						<Card key={index} className="w-full group relative overflow-hidden">
							<CardHeader className="flex flex-col items-center space-y-4 pb-6">
								<div className="w-32 h-32 overflow-hidden flex items-center justify-center">
									<img
										src={`/clinics/${clinic.imagePath}`}
										alt={`${clinic.name} logo`}
										width={200}
										height={60}
										className="rounded-lg"
									/>
								</div>
								<CardTitle className="text-xl font-bold text-center">
									<a href={`/clinics/${clinic.slug}`} title={clinic.name}>
										{clinic.name}
									</a>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<Globe className="h-4 w-4" />
											<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<MapPin className="h-4 w-4" />
										<span>{clinic.location}, {clinic.city}, {clinic.country}</span>
									</div>
									<div className="flex items-center space-x-2">
										<MessageCircle className="h-4 w-4" />
										<div className="flex flex-wrap gap-1">
											{languageArray.map((lang, index) => (
												<Badge key={index} variant="secondary">{lang}</Badge>
											))}
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<StarRating rating={clinic.review.score} />
										<div className="text-sm text-muted-foreground">
											<a href={clinic.review.source} target="blank" className="hover:underline">{clinic.review.score} stars, {clinic.review.totalReviews} reviews</a>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<Scissors className="h-4 w-4" />
										<div className="flex flex-wrap gap-1">
											{methodsArray.map((method, index) => (
												<Badge key={index} variant="secondary">{method}</Badge>
											))}
										</div>
									</div>
									<div>
										{/* <span className="font-semibold">Consultation:</span> {clinic.ConsultationPrice === 0 ? 'Free' : `${clinic.ConsultationPrice} ${clinic.local_currency}`} */}
										{clinic.consulationOnline && <Badge className="ml-2" variant="outline">Online Available</Badge>}
									</div>
								</div>
							</CardContent>
							<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-700 bg-opacity-50">
								<Link
									href={`/clinics/${clinic.slug}`}
									className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2"
								>
									Learn More
								</Link>
							</div>
						</Card>
					);
				})}
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4 text-center">Clinic Locations</h2>
				<GoogleMapsComponent clinics={filteredByCountry.map(clinic => ({
					name: clinic.name,
					location: clinic.location,
					city: clinic.city,
					country: clinic.country,
					lat: clinic.lat,
					lng: clinic.lng,
				}))}/>
			</div>
		</div>
	);
}