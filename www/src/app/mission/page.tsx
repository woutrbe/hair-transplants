import { InfoIcon as Transparency, Users, TrendingUp, CheckCircle, Globe } from 'lucide-react'
import { Metadata } from "next";
import { getPage, MissionPage } from "../../content/types";

export async function generateMetadata(): Promise<Metadata> {
	const why = await getPage('mission');

	return {
		title: why.data.title,
		description: why.data.description,

		alternates: {
			canonical: `${process.env.URL}/`,
		}
	}
}

export default async function Why() {
	const missionPage = await getPage('mission') as MissionPage;

	return (
		<div>
			<section className="mb-20">
				<h2 className="text-3xl font-bold mb-6">Our Mission</h2>
				<p className="text-xl text-gray-600 mb-8">
					At HairCompare, we're on a mission to revolutionize the hair transplant industry. We believe in creating a world where individuals can make informed decisions about their hair restoration journey with confidence and ease.
				</p>
				<div className="grid md:grid-cols-3 gap-8">
					{[
					{
						icon: <Transparency className="h-12 w-12 text-purple-600" />,
						title: "Increase Transparency",
						description: "We're committed to bringing clarity to the hair transplant process, ensuring that patients have access to comprehensive, honest information about procedures, clinics, and outcomes."
					},
					{
						icon: <Users className="h-12 w-12 text-purple-600" />,
						title: "Foster Acceptance",
						description: "By normalizing conversations around hair loss and restoration, we're working to reduce stigma and create a more accepting environment for those seeking treatment."
					},
					{
						icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
						title: "Grow the Market",
						description: "Through increased transparency and acceptance, we aim to expand the hair transplant market, connecting more patients with high-quality clinics and innovative solutions."
					}
					].map((item, index) => (
					<div key={index} className="bg-white rounded-lg shadow-md p-6">
						{item.icon}
						<h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
						<p className="text-gray-600">{item.description}</p>
					</div>
					))}
				</div>
			</section>

			<section className="mb-20">
				<h2 className="text-3xl font-bold mb-6">Why Choose HairCompare?</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{[
					"Comprehensive clinic listings and reviews",
					"Expert-verified information on procedures",
					"Transparent pricing and outcome expectations",
					"Community support and shared experiences",
					"Cutting-edge updates on hair restoration technology",
					"Personalized clinic matching service"
					].map((item, index) => (
					<div key={index} className="flex items-start">
						<CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
						<p className="text-lg text-gray-700">{item}</p>
					</div>
					))}
				</div>
			</section>

			<section className="mb-20">
				<h2 className="text-3xl font-bold mb-6">The First of Our Kind</h2>
				<div className="flex items-center mb-8">
					<Globe className="h-16 w-16 text-purple-600 mr-6" />
					<p className="text-xl text-gray-600">
					HairCompare is proud to be the first international website dedicated to providing comprehensive information about hair transplants. Our global perspective allows us to offer unparalleled insights and comparisons across borders.
					</p>
				</div>
				<div className="bg-purple-50 rounded-lg p-6">
					<h3 className="text-2xl font-semibold mb-4">What Sets Us Apart</h3>
					<ul className="grid md:grid-cols-2 gap-4">
					{[
						"First international hair transplant comparison platform",
						"Comprehensive global database of clinics and surgeons",
						"Standardized quality metrics across different countries",
						"Multi-language support for international users",
						"Cross-border price comparisons and market insights",
						"Cultural perspectives on hair restoration worldwide"
					].map((item, index) => (
						<li key={index} className="flex items-start">
						<Globe className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0 mt-1" />
						<span className="text-lg text-gray-700">{item}</span>
						</li>
					))}
					</ul>
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
				<p className="text-xl text-gray-600 mb-8">
					Whether you are a patient seeking treatment or a clinic providing world-class care, we invite you to join us in our mission to transform the hair transplant industry.
				</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<a href="#"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
						Find a Clinic
					</a>
					<a href="https://forms.gle/mzvdDw5yhH4JZfN39" target="_blank"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200">
						Add Your Clinic
					</a>
				</div>
			</section>
			<section className="max-w-3xl mx-auto mb-10 mt-10">
				<div className="text-center mb-2">
					<div className="text-2xl font-medium  mb-2">Frequently asked questions</div>
				</div>

				{missionPage.data.faq.map((faq, i) => {
					return (
						<div key={i} className="bg-white/5 px-6 py-6 border-b border-gray-300">
							<div className="font-semibold text-gray-900 hover:no-underline mb-2">{faq.q}</div>
							<div className="text-gray-600">{faq.a}</div>
						</div>
					)
				})}
			</section>
      </div>
	);
}
