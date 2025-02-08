import { Metadata } from "next";
import { getCountries } from "../../content/types";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Hair transplant clinics by country',
		description: 'Discover the best hair transpant clinics all over the world.',

		alternates: {
			canonical: `${process.env.URL}/countries`
		}
	}
}

export default async function CountriesPage() {
	const countries = await getCountries();

	return (
		<div>
			<h3 className="font-bold text-3xl mb-5">All countries</h3>

			<div className="grid grid-cols-1 md:grid-cols-3">
				{countries.sort((a, b) => a.name.localeCompare(b.name)).map(country => {
					return (
						<a className="hover:underline" key={country.slug} href={`/countries/${country.slug}`} title={`Hair transplant clinics in ${country.name}`}>{country.name}</a>
					)
				})}
			</div>
		</div>
	)
}