import { MetadataRoute } from "next";
import { getClinics, getCountries, getPages } from "../content/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getPages();
	const clinics = await getClinics();
	const countries = await getCountries();


	return [
		'',
		...pages.map(p => p.data.slug),
		'mission',
		'treatment-options',
		...countries.map(c => `countries/${c.slug}`),
		...clinics.map(c => `clinics/${c.slug}`),
	].map(slug => ({
		url: `${process.env.URL}/${slug}`
	}))
}