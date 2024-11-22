import { MetadataRoute } from "next";
import { getPages } from "../content/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getPages();

	return [
		'',
		...pages.filter(p => p.data.slug !== 'homepage').map(p => p.data.slug),
	].map(slug => ({
		url: `${process.env.URL}/${slug}`
	}))
}