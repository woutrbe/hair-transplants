import { Metadata } from "next";
import { getClinics } from "../../content/types";
import ClinicPageFilters from "../../components/filter/ClinicPageFilters";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: `Top Hair Transplant Clinics`,
		description: `Top Hair Transplant Clinics`,

		alternates: {
			canonical: `${process.env.URL}/top-hair-transplant-clinics`,
		}
	}
}

export default async function Page() {
	const allClinics = await getClinics();

	return (
		<div className="mb-20">
			<h3 className="font-bold text-3xl mb-5">Top Hair Transplant Clinics</h3>

			<ClinicPageFilters clinics={allClinics.sort((a, b) => a.review.avgScore = b.review.avgScore)} />
		</div>
	);
}