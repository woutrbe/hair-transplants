import { Metadata } from "next";
import { getClinic, getClinics, TreatmentWithClinic } from "../../../content/types";
import TreatmentCard from "../../../components/TreatmentCard";
import StarRating from "../../../components/StarRating";
import { ChevronRight, Globe, MessageCircle, Scissors } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import GoogleMapsComponent from "@/components/GoogleMaps";
import { DoctorCard } from "../../../components/DoctorCard";
import ClinicBranchCard from "../../../components/ClinicBranchCard";

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
		description: `${clinic?.name}: Treatments, information and reviews.`,

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
	const languages = Array.from(new Set(clinic.branches.flatMap(b => b.languages)));

	return (
		<div>
			<div className="border-b border-gray-300 py-10 text-center mb-10">
				<h4 className="font-semibold text-3xl mb-2">{clinic.name}</h4>
			</div>

			<div className="space-y-10">
				<div className="flex flex-col md:flex-row gap-10">
					<div className="w-full md:w-2/6">
						<div className="border border-gray-300 border-t-2 border-t-purple-600 p-5 space-y-5">
							<h5 className="font-semibold">Clinic details</h5>

							<div>{clinic.name}</div>

							<div className="flex items-center space-x-2">
								<Globe className="h-4 w-4" />
								<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
							</div>

							{methods.length > 0 && <div className="flex items-center space-x-2">
								<Scissors className="h-4 w-4" />
								<div className="flex flex-wrap gap-1">
									{methods.map((method, index) => (
										<Badge key={index} variant="secondary">{method}</Badge>
									))}
								</div>
							</div>}

							{languages.length > 0 && <div className="flex items-center">
								<MessageCircle className="w-4 h-4 mr-2" />
								<div className="flex gap-1 text-muted-foreground text-sm">
									{languages.join(', ')}
								</div>
							</div>}

							{clinic.review.avgScore > 0 && <div>
								<div className="mb-2">
									<StarRating rating={clinic.review.avgScore} />
								</div>
								<div className="text-sm text-muted-foreground">
									{clinic.review.avgScore} stars, {clinic.review.totalReviews} reviews
								</div>
							</div>}

							<div>
								{clinic.consulationOnline && <Badge variant="outline">Online Available</Badge>}
							</div>

							<div>
								<a href={clinic.url} target="blank" className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
									Book Consultation
									<ChevronRight className="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>

					<div className="w-full md:w-4/6">
						<GoogleMapsComponent clinics={[clinic]} />
					</div>
				</div>

				{clinic.doctors.length > 0 && <div>
					<h4 className="text-3xl font-semibold mb-5">Doctors</h4>

					<div className="grid grid-cols-1 grid-cols-4 gap-10">
						{clinic.doctors.map(d => <DoctorCard key={d.slug} doctor={d} />)}
					</div>
				</div>}

				{treatments.length > 0 && <div>
					<h4 className="text-3xl font-semibold mb-5">Treatments</h4>

					<div className="space-y-5">
						{treatments.map((t, i) => <TreatmentCard treatment={t} key={i} />)}
					</div>
				</div>}

				<div>
					<h4 className="text-3xl font-semibold mb-5">Clinic Locations</h4>

					<div className="space-y-5">
						{clinic.branches.map((branch, index) => <ClinicBranchCard key={index} clinic={clinic} branch={branch} />)}
					</div>
				</div>
			</div>
		</div>
	);
}