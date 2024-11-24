import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

	return {
		title: 'Treatment Options',
		description: 'Treatment Options',

		alternates: {
			canonical: `${process.env.URL}/guides/treatment-options`,
		}
	}
}

export default async function TreatmentOptions() {
	return (
		<article>
			<section className="mb-20">
				<h2 className="text-3xl font-bold mb-6">What is a Hair Transplant?</h2>
				<p className="text-xl text-gray-600 mb-8">
					A hair transplant is a medical procedure that moves healthy hair from one part of your scalp (the donor area) to areas where you have thinning or no hair (the recipient area). It's a permanent solution to hair loss.
					There are three main types of hair transplant techniques:
				</p>
				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							// icon: <Transparency className="h-12 w-12 text-purple-600" />,
							title: "FUE (Follicular Unit Extraction)",
							description: "Transplants individual hair follicles with tiny scars, but requires shaving the donor area."
						},
						{
							// icon: <Users className="h-12 w-12 text-purple-600" />,
							title: "Micro FUE (No Shaving Required)",
							description: "A no-shave version of FUE that’s ideal for smaller, precise transplants with invisible scars."
						},
						{
							// icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
							title: "FUT (Follicular Unit Transplantation)",
							description: "Transplants a strip of hair for larger coverage but leaves a thin, long scar."
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
			<section>
				<h3 className="text-3xl mb-6 font-bold text-center">Let's break them down to help you choose the best option.</h3>
				<div className="overflow-x-auto mb-8">
					<table className="min-w-full bg-white rounded-lg shadow-sm">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FUE</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Micro FUE</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FUT</th>
							</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Scarring</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Small dots (hardly visible)</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Same (no shaving required)</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Thin, long scar</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Recovery time</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5-7 days</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5-7 days</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">10-14 days</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cost</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Higher</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Highest</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Lower</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<hr></hr>

			<section>
				<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Option 1: FUE (Follicular Unit Extraction)</h2>
				<h3 className="text-xl font-semibold text-gray-900 mb-3">How it works:</h3>
				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>The doctor removes individual hair follicles from the back or side of your scalp.</li>
					<li>These follicles are transplanted to areas where you need more hair.</li>
				</ul>

				<h3 className="text-xl font-semibold text-gray-900 mb-3">What you need to know:</h3>
				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>Done under local anesthesia (you're awake but won't feel pain).</li>
					<li>Scars are very small, like tiny dots, and usually not visible.</li>
				</ul>

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<div>
						<h4 className="font-semibold text-green-700 mb-3">Pros:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Minimal scars – great if you want short hair.</li>
							<li>Recovery is faster, usually 5-7 days.</li>
							<li>Less pain after the procedure.</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-700 mb-3">Cons:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Requires shaving the donor area.</li>
							<li>Time-consuming (can take several hours to a full day).</li>
							<li>Typically more expensive than FUT.</li>
						</ul>
					</div>
				</div>
			</section>

			<hr></hr>

			<section>
				<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Option 2: Micro FUE (No Hair Shaving Required)</h2>
				<h3 className="text-xl font-semibold text-gray-900 mb-3">How it works:</h3>
				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>Works like regular FUE, but the donor area is not shaved.</li>
					<li>Hair follicles are carefully removed without affecting surrounding hair.</li>
				</ul>

				<h3 className="text-xl font-semibold text-gray-900 mb-3">What you need to know:</h3>

				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>Suitable for smaller transplants (mild to medium hair loss).</li>
					<li>Ideal if you don't want your hair styling affected.</li>
				</ul>

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<div>
						<h4 className="font-semibold text-green-700 mb-3">Pros:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>No need to shave the donor area.</li>
							<li>Leaves tiny, almost invisible scars.</li>
							<li>Recovery is quick, usually within a week.</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-700 mb-3">Cons:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Takes longer than regular FUE due to the precision required.</li>
							<li>Costs more because it requires more skill and time.</li>
						</ul>
					</div>
				</div>
			</section>

			<hr></hr>
			<section>
				<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Option 3: FUT (Follicular Unit Transplantation)				</h2>
				<h3 className="text-xl font-semibold text-gray-900 mb-3">How it works:</h3>
				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>The doctor removes a strip of skin with hair from the back of your scalp.</li>
					<li>Individual hair follicles are taken from this strip and transplanted.</li>
				</ul>

				<h3 className="text-xl font-semibold text-gray-900 mb-3">What you need to know:</h3>

				<ul className="list-disc pl-6 mb-6 text-gray-700">
					<li>Leaves a thin, long scar where the strip was taken.</li>
					<li>Suitable for people with a lot of hair loss.</li>
				</ul>

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<div>
						<h4 className="font-semibold text-green-700 mb-3">Pros:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Transplants more hair in one session – good for advanced hair loss.</li>
							<li>Costs less than FUE or Micro FUE.</li>
							<li>No need to shave the donor area.</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-700 mb-3">Cons:</h4>
						<ul className="list-disc pl-6 text-gray-700">
							<li>The scar is visible if you shave your head.</li>
							<li>Recovery takes longer, about 10-14 days.</li>
							<li>Slightly more painful post-surgery.</li>
						</ul>
					</div>
				</div>
			</section>

			<hr></hr>

			<section>
				<h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Other Options for Hair Loss</h2>
				<div className="grid md:grid-cols-2 gap-8  mb-8">
					{[
						{
							// icon: <Transparency className="h-12 w-12 text-purple-600" />,
							title: "Scalp Micropigmentation (SMP)",
							description: "A tattoo-like procedure that creates the look of fuller hair."
						},
						{
							// icon: <Users className="h-12 w-12 text-purple-600" />,
							title: "PRP Therapy",
							description: "Injections of your own blood plasma to help stimulate hair growth."
						}
					].map((item, index) => (
						<div key={index} className="bg-white rounded-lg shadow-md p-6">
							{item.icon}
							<h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
							<p className="text-gray-600">{item.description}</p>
						</div>
					))}
				</div>
				<div className="bg-[#9333EA]/10 p-6 rounded-lg mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">What to Do Next</h2>
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Book a Consultation:</h3>
					<p className="text-gray-700 mb-4">The doctor will check your scalp and tell you which method suits you.</p>
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Things the Doctor Will Check:</h3>
					<ul className="list-disc pl-6 text-gray-700">
						<li>How much donor hair you have.</li>
						<li>How many grafts you need for the desired look.</li>
						<li>Your budget (transplants vary greatly in cost).</li>
					</ul>
				</div>
			</section>
		</article>
	);
}
