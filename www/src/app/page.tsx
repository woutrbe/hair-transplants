import { Metadata } from "next";
import { getClinics, getHomepage, getOrganisations, TreatmentWithClinic } from "../content/types";
import ProductFilterWrapper from "../components/filter/ProductFilterWrapper";

export async function generateMetadata(): Promise<Metadata> {
	const homepage = await getHomepage();

	return {
		title: homepage.data.title,
		description: homepage.data.description,

		alternates: {
			canonical: `${process.env.URL}/`,
		}
	}
}

export default async function Home() {
	const homepage = await getHomepage();
	const organisations = await getOrganisations();

	const clinics = await getClinics();
	const treatments: TreatmentWithClinic[] = clinics.flatMap(c=> (c.treatments || []).map(t => {
		return {
			...t,
			clinic: c,
		}
	}));

	return (
		<>
			<div className="mb-20">
				<ProductFilterWrapper treatments={treatments} />
			</div>

			<div className="max-w-3xl mx-auto mb-20">
				<h3 className="text-2xl text-center font-medium mb-5">Organisations</h3>

				<div className="flex space-x-5 justify-center items-center">
					{organisations.map(org => {
						return <div key={org.slug}>
							<img className="max-h-[100px] max-w-[250px]" src={org.img} title={org.name} alt={org.name} />
						</div>
					})}
				</div>
			</div>

			<div className="max-w-3xl mx-auto mb-10">
				<h3 className="text-2xl text-center font-medium mb-5">Frequently asked questions</h3>

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
