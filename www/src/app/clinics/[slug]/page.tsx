import { Metadata } from "next";
import { getClinic, getClinics, TreatmentWithClinic } from "../../../content/types";
import TreatmentCard from "../../../components/TreatmentCard";

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

	return (
		<div>
			<h2 className="font-bold text-3xl mb-5">{clinic.name}</h2>

			<div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
				<div className="md:w-4/12">

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