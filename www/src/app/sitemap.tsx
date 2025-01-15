import { MetadataRoute } from "next";
import { getClinics, getCountries, getDoctors, getPages } from "../content/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getPages();
	const clinics = await getClinics();
	const countries = await getCountries();
	const doctors = await getDoctors();

	return [
		'',
		...pages.map(p => p.data.slug),
		'mission',
		'treatment-options',
		'top-hair-transplant-clinics',
		'best-hair-transplant-clinics',
		'countries',
		...countries.map(c => `countries/${c.slug}`),
		...clinics.map(c => `clinics/${c.slug}`),

		'doctors',
		...doctors.map(d => `doctors/${d.slug}`),
	].map(slug => ({
		url: `${process.env.URL}/${slug}`
	}))
}