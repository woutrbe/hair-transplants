import { MetadataRoute } from "next";
import { getClinics, getPages } from "../content/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getPages();
	const clinics = await getClinics();
	const uniqueCountries = Array.from(new Set(clinics.map(c => c.country)));


	return [
		'',
		...pages.map(p => p.data.slug),
		'mission',
		'treatment-options',
		...uniqueCountries.map(c => `countries/${c}`),
		...clinics.map(c => `clinics/${c.slug}`),
	].map(slug => ({
		url: `${process.env.URL}/${slug}`
	}))
}