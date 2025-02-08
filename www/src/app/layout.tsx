import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { getCountries } from "../content/types";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Banner from "@/components/Banner";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const countries = await getCountries();

	return (
		<html lang="en">
			<body>
				<header className="bg-[#e6f3f3]">
					<div className="container mx-auto px-4">
						<div className="py-6 flex items-center">
							<div>
								<h1>
									<a href="/" title="Hair compare" className="text-2xl text-black">
										HairClinicFinder.
									</a>
								</h1>
							</div>

							<div className="ml-auto">
								{/* Desktop navigation */}
								<div className="hidden md:flex">
									<nav className="flex space-x-4">
										<a className="hover:underline" href="/treatment-options" title="Treatment Guide">Treatment Guide</a>
										<a className="hover:underline" href="/mission" title="Our Mission">Our Mission</a>
										<a className="hover:underline" href="/story" title="Our Story">Our Story</a>
										<a className="hover:underline" href="/costs-explained" title="Costs Explained">Costs Explained</a>

										<div className="group relative">
											<div className="flex items-center">
												<span>Clinics</span>
												<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
												</svg>
											</div>

											<div className="hidden group-hover:block absolute right-0 top-full pt-2 z-20">
												<div className="bg-white text-base z-10 rounded-lg border border-gray-300 rounded shadow p-5 min-w-[600px] flex flex-col">
													<div className="grid grid-cols-3 gap-2">
														{countries.sort((a, b) => a.name.localeCompare(b.name)).map(country => {
															return (
																<a key={country.slug} href={`/countries/${country.slug}`} title={country.name} className="hover:underline">{country.name}</a>
															)
														})}
													</div>
												</div>
											</div>
										</div>

										<a className="hover:underline" href="https://docs.google.com/forms/d/e/1FAIpQLSd44D58KMvVrYt55TUOkNREN7cvLPyEDPDbsm8V0HNjiFLgbQ/viewform?usp=send_form" target="_blank" title="Add your Clinic">Add your Clinic</a>
									</nav>
								</div>

								{/* Mobile menu */}
								<div className="block md:hidden">
									<Sheet>
										<SheetTrigger asChild>
											<div className='rounded border border-gray-300 p-2'>
												<MenuIcon />
											</div>
										</SheetTrigger>
										<SheetContent side={'left'} className="overflow-y-scroll">
											<nav className="flex flex-col space-y-4">
												<a className="hover:underline" href="/treatment-options" title="Treatment Guide">Treatment Guide</a>
												<a className="hover:underline" href="/mission" title="Our Mission">Our Mission</a>
												<a className="hover:underline" href="/story" title="Our Story">Our Story</a>
												<a className="hover:underline" href="/costs-explained" title="Costs Explained">Costs Explained</a>

												<div className="space-y-2">
													<div className="font-semibold">Clinics</div>

													<div className="flex flex-col space-y-2">
														{countries.sort((a, b) => a.name.localeCompare(b.name)).map(country => {
															return (
																<a key={country.slug} href={`/countries/${country.slug}`} title={country.name} className="hover:underline">{country.name}</a>
															)
														})}
													</div>
												</div>

												<a className="hover:underline" href="https://docs.google.com/forms/d/e/1FAIpQLSd44D58KMvVrYt55TUOkNREN7cvLPyEDPDbsm8V0HNjiFLgbQ/viewform?usp=send_form" target="_blank" title="Add your Clinic">Add your Clinic</a>
											</nav>
										</SheetContent>
									</Sheet>
								</div>
							</div>
						</div>

						<Banner />
					</div>
				</header>

				<main id="main-content" className="container mx-auto px-4 py-10">
					{children}
				</main>

				<footer className="bg-[#e6f3f3]">
					<div className="container mx-auto px-4 py-10">
						<div className="mb-14">
							<h5 className="mb-3">
								<a href="/" title="Hair compare" className="text-2xl text-black">
									HairClinicFinder.
								</a>
							</h5>
							<div className="text-slate-900 mb-2">Helping you find the best hair transplant clinics worldwide.</div>
							<div className="text-slate-900">We’ve gathered all the information you need so you can easily search for hair transplant clinics across the globe. Start your journey today with our user-friendly filter and sort options.</div>
						</div>

						<div className="grid grid-flow-col">
							<div>
								<h3 className="text-slate-900 text-xl font-semibold mb-5">Countries</h3>
								<div className="text-slate-900 grid grid-cols-1 md:grid-cols-3">
									{countries.map(country => {
										return <div key={country.slug}>
											<a href={`/countries/${country.slug}`} title={country.name} className="hover:underline">{country.name}</a>
										</div>
									})}
								</div>
							</div>

							<div>
								<h3 className="text-slate-900 text-xl font-semibold mb-5">About Us</h3>
								<div className="text-slate-900">
									<ul>
										<li>
											<a href="/mission" title="Our Mission" className="hover:underline">Our Mission</a>
										</li>
										<li>
											<a href="/story" title="Our Story" className="hover:underline">Our Story</a>
										</li>
									</ul>
								</div>
							</div>

							<div>
								<h3 className="text-slate-900 text-xl font-semibold mb-5">Resources</h3>
								<div className="text-slate-900">
									<ul>
										<li>
											<a href="/treatment-options" title="Treatment Guide" className="hover:underline">Treatment Guide</a>
										</li>
										<li>
											<a href="https://docs.google.com/forms/d/e/1FAIpQLSd44D58KMvVrYt55TUOkNREN7cvLPyEDPDbsm8V0HNjiFLgbQ/viewform?usp=send_form" target="_blank" rel="nofollow" title="Add your Clinic" className="hover:underline">Add your Clinic</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</footer>

				{process.env.NODE_ENV !== 'development' && <GoogleAnalytics gaId="G-7KT8LD1V20" />}
			</body>
		</html>
	);
}
