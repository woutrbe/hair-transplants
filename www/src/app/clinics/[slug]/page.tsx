import { Metadata } from "next";
import { getClinic, getClinics, TreatmentWithClinic } from "../../../content/types";
import TreatmentCard from "../../../components/TreatmentCard";
import StarRating from "../../../components/StarRating";
import { ChevronRight, Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import GoogleMapsComponent from "@/components/GoogleMaps";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateStaticParams() {
	const clinics = await getClinics();

	return clinics.map(clinic => ({
		slug: clinic.slug,
	}))
};


export async function generateMetadata(props: Props): Promise<Metadata> {
	const clinics = await getClinics();
	const clinic = clinics.find(c => c.slug === props.params.slug);

	return {
		title: clinic?.name,
		description: clinic?.name,

		alternates: {
			canonical: `${process.env.URL}/clinics/${props.params.slug}`,
		}
	}
}

export default async function ClinicPage(props: Props) {
	const clinic = await getClinic(props.params.slug);
	const treatments: TreatmentWithClinic[] = (clinic.treatments || []).map(t => {
		return {
			...t,
			clinic,
		}
	});

	if (!clinic) {
		return <>Clinic not found...</>
	}

	const methods = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

	return (
		<div>
			<div className="relative flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
				<div className="md:w-4/12">
					<div className="space-y-5 sticky top-5">
						<h2 className="font-bold text-3xl mb-5">{clinic.name}</h2>

						<div className="gap-1 text-muted-foreground text-sm space-y-2">
							<div className="flex items-center space-x-2">
								<Globe className="h-4 w-4" />
								<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
							</div>

							<div className="flex items-center mb-1">
								<MapPin className="w-4 h-4 mr-2" />
								<span>{clinic.location}, {clinic.city}, {clinic.country}</span>
							</div>

							<div className="flex items-center">
								<MessageCircle className="w-4 h-4 mr-2" />
								<div className="flex flex-wrap gap-1">
									{clinic.languages.map((lang, index) => (
										<Badge key={index} variant="secondary">{lang}</Badge>
									))}
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Scissors className="h-4 w-4" />
								<div className="flex flex-wrap gap-1">
									{methods.map((method, index) => (
										<Badge key={index} variant="secondary">{method}</Badge>
									))}
								</div>
							</div>
						</div>

						<div>
							{clinic.consulationOnline && <Badge variant="outline">Online Available</Badge>}
						</div>

						<div>
							<div className="mb-2">
								<StarRating rating={clinic.review.score} />
							</div>
							<div className="text-sm text-muted-foreground">
								<a href={clinic.review.source} target="blank" className="hover:underline">{clinic.review.score} stars, {clinic.review.totalReviews} reviews</a>
							</div>
						</div>

						<div>
							<a href={clinic.url} target="blank" className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
								Book Consultation
								<ChevronRight className="w-4 h-4" />
							</a>
						</div>
						<GoogleMapsComponent clinics={[clinic]} />
					</div>
				</div>


				<div className="md:w-8/12">
					<div className="space-y-5">
						{treatments.map((t, i) => <TreatmentCard treatment={t} key={i} />)}
					</div>
				</div>
			</div>
		</div>
	);
}