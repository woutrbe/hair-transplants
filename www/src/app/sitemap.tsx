import { MetadataRoute } from "next";
import { getPages } from "../content/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getPages();

	return [
		'',
		...pages.map(p => p.data.slug),
		'mission',
		'guides/treatment-options'
	].map(slug => ({
		url: `${process.env.URL}/${slug}`
	}))
}