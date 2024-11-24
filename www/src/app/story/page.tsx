import { InfoIcon as Transparency, Users, TrendingUp, CheckCircle, Globe } from 'lucide-react'
import { Metadata } from "next";
import { getPage } from "../../content/types";

export async function generateMetadata(): Promise<Metadata> {
	const why = await getPage('story');

	return {
		title: why.data.title,
		description: why.data.description,

		alternates: {
			canonical: `${process.env.URL}/${why.data.slug}`,
		}
	}
}

export default async function Story() {
	return (
		<div>
            <p>Markdown here, from page Story.md</p>
            
		</div>
	);
}
