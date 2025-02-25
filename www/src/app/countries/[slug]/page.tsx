import { Metadata } from "next";
import { getClinics, getCountries, getCountry } from "../../../content/types";
import ClinicPageFilters from "../../../components/filter/ClinicPageFilters";

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
	const filteredByCountry = allClinics.filter(c => c.branches.some(branch => branch.countryCode === country.cc));
	return (
		<div className="mb-20">
			<h3 className="font-bold text-3xl mb-5">Hair transplant clinics in {country.name}</h3>

			<ClinicPageFilters clinics={filteredByCountry} />
		</div>
	);
}