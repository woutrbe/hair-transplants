export default function Banner() {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between mt-0 md:mt-10 py-2 md:pt-10 md:pb-0">
			<div className="lg:w-2/4 mb-8 md:mb-0">
				<h1 className="text-4xl md:text-5xl leading-xl font-bold text-gray-800 mb-4">
					We find the best clinics for your hair transplant surgery
				</h1>

				<p className="text-gray-600 mb-6">
					Expert doctors ready to help you achieve the hair you&apos;ve always wanted.
				</p>

				<div className="space-y-4 md:space-x-4">
					<a href="/" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
						Search all clinics
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</a>

					<a href="/mission" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
						Read about our mission
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>

			<div className="w-1/2 hidden lg:flex justify-end">
				<img src="/header-right.png" alt="" title="" />
			</div>
		</div>
	)
}