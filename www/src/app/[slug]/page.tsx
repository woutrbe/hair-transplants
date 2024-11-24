import { Metadata } from "next";
import { getPage, getPages } from "../../content/types";
import MarkdownPage from "../../components/MarkdownPage";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateStaticParams() {
	const pages = await getPages()

	return pages.map(page => ({
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
		<>
			<div className="max-w-7xl mx-auto mb-8 px-4 md:px-6">
				<MarkdownPage title={page.data.title} content={page.content} />
			</div>

			<div className="max-w-3xl mx-auto mb-10">
				<div className="text-center mb-2">
					<div className="text-2xl font-medium  mb-2">Frequently asked questions</div>
				</div>

				{page.data.faq.map((faq, i) => {
					return (
						<div key={i} className="bg-white/5 px-6 py-6 border-b border-gray-300">
							<div className="font-semibold text-gray-900 hover:no-underline mb-2">{faq.q}</div>
							<div className="text-gray-600">{faq.a}</div>
						</div>
					)
				})}
			</div>
		</>
	);
}