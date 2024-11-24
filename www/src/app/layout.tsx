import EmailSignupForm from "../components/EmailSignupForm";
import { getConfig } from "../content/types";
import "./globals.css";
import Banner from "@/components/Banner";
import { GoogleAnalytics } from '@next/third-parties/google';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const config = await getConfig();

	return (
		<html lang="en">
			<body>
				<header className="bg-[#e6f3f3]">
					<div className="container mx-auto px-4">
						<div className="py-6 flex items-center">
							<div>
								<h1>
									<a href="/" title="Hair compare" className="text-2xl text-black">
										HairCompare.
									</a>
								</h1>
							</div>

							<div className="ml-auto">
								<nav className="flex space-x-4">
									{config.navigation.map(({ link, sub }) => {
										const [title, url] = link;
										return (
											<div key={url} className="flex items-center group relative">
												{url && <a className="hover:underline" href={url} title={title}>{title}</a>}
												{!url && <div>{title}</div>}

												{sub && <>
													<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
													</svg>

													<div className="hidden group-hover:block absolute left-0 top-full pt-2 z-20">
														<div className="bg-white text-base z-10 border border-gray-300 rounded shadow p-2 min-w-[200px] flex flex-col">
															{sub.map(([title, url]) => {
																return (
																	<a key={url} className="hover:bg-gray-100 p-2 rounded transition" href={url} title={title}>{title}</a>
																)
															})}
														</div>
													</div>
												</>}
											</div>
										)
									})}
								</nav>
							</div>
						</div>
						<Banner></Banner>
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
											<a href="/mission" title="Our Mission" className="hover:underline">Our Mission</a>
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

				{process.env.NODE_ENV !== 'development' && <GoogleAnalytics gaId="G-7KT8LD1V20" />}
			</body>
		</html>
	);
}
