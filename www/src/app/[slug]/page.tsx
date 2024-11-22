import { Metadata } from "next";
import { getPage, getPages } from "../../content/types";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateStaticParams() {
	const pages = await getPages()

	return pages.filter(p => p.data.slug !== 'homepage').map(page => ({
		slug: page.data.slug,
	}))
};


export async function generateMetadata(props: Props): Promise<Metadata> {
	const page = await getPage(props.params.slug);

	return {
		title: page.data.title,
		description: page.data.description,

		alternates: {
			canonical: `${process.env.URL}/${page.data.slug}`,
		}
	}
}

export default async function Page(props: Props) {
	const page = await getPage(props.params.slug);

	return (
		<div>{page.data.title}</div>
	);
}