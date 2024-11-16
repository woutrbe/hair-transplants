import EmailSignupForm from "../components/EmailSignupForm";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<header className="bg-[#e6f3f3]">
					<div className="container mx-auto px-4">
						<div className="py-6">
							<h1>
								<a href="/" title="Hair compare" className="text-2xl text-black">
									HairCompare.
								</a>
							</h1>
						</div>

						<div className="flex flex-col md:flex-row items-center justify-between mt-10 py-10 lg:py-0">
							<div className="lg:w-2/4 mb-8 md:mb-0">
								<h1 className="text-4xl md:text-5xl leading-xl font-bold text-gray-800 mb-4">
									We find the best clinics for your hair transplant surgery
								</h1>

								<p className="text-gray-600 mb-6">
									Expert doctors ready to help you achieve the hair you&apos;ve always wanted.
								</p>

								<button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 py-3 flex items-center gap-2">
									Find your clinic
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</div>

							<div className="w-1/2 hidden lg:flex justify-end">
								<img src="/header-right.png" alt="" title="" />
							</div>
						</div>
					</div>
				</header>

				<main>
					<div className="container mx-auto px-4 py-10">
						{children}
					</div>
				</main>

				<footer className="bg-[#e6f3f3]">
					<div className="container mx-auto px-4 py-10">
						<div className="mb-14 flex items-center">
							<div>
								<h1 className="mb-3">
									<a href="/" title="Hair compare" className="text-2xl text-black">
										HairCompare.
									</a>
								</h1>
								<div className="text-slate-900">Helping you find the best hair transplant clinics worldwide.</div>
							</div>

							<div className="ml-auto">
								<form action="/">
									<div className="flex space-x-5">
										<EmailSignupForm />
									</div>
								</form>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 space-y-10 md:space-y-0">
							<div>
								<h3 className="text-slate-900 text-xl font-semibold mb-5">About Us</h3>

								<div className="text-slate-900">
									<ul>
										<li>
											<a href="/" title="Our Mission" className="hover:underline">Our Mission</a>
										</li>
									</ul>
								</div>
							</div>

							<div>
								<h3 className="text-slate-900 text-xl font-semibold mb-5">Resources</h3>

								<div className="text-slate-900">
									<ul>
										<li>
											<a href="/" title="Hair Loss Guide" className="hover:underline">Hair Loss Guide</a>
										</li>
										<li>
											<a href="/" title="Treatment Options" className="hover:underline">Treatment Options</a>
										</li>
										<li>
											<a href="/" title="Hair Loss Guide" className="hover:underline">Hair Loss Guide</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
