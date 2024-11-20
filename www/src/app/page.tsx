import { Metadata } from "next";
import { getPage, getTreatments, HomePage } from "../content/types";
import ProductFilterWrapper from "../components/filter/ProductFilterWrapper";

export async function generateMetadata(): Promise<Metadata> {
	const homepage = await getPage('homepage');

	return {
		title: homepage.data.title,
		description: homepage.data.description,

		alternates: {
			canonical: `${process.env.URL}/`,
		}
	}
}

export default async function Home() {
	const treatments = await getTreatments();
	const homepage = await getPage('homepage') as HomePage;

	return (
		<>
			<div>
				<ProductFilterWrapper treatments={treatments} />
			</div>
			<div className="max-w-3xl mx-auto mb-10">
				<div className="text-center mb-2">
					<div className="text-2xl font-medium  mb-2">Frequently asked questions</div>
				</div>

				{homepage.data.faq.map((faq, i) => {
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
