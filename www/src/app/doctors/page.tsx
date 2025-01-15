import { Metadata } from "next";
import { Doctor, getDoctors } from "../../content/types";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Hair transplant doctors',
		description: 'Discover the best hair transpant doctors all over the world.',

		alternates: {
			canonical: `${process.env.URL}/doctors/`,
		},
	}
}

export default async function DoctorsPage() {
	const doctors = await getDoctors();
	const doctorsByFirstLetter = doctors.sort((a, b) => a.name.localeCompare(b.name)).reduce((all, doctor) => {
		const firstLetter = doctor.name.charAt(0);

		if (!all[firstLetter]) {
			all[firstLetter] = [];
		}

		all[firstLetter].push(doctor);

		return all;
	}, {} as { [key: string]: Doctor[] });

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
				{Object.entries(doctorsByFirstLetter).map(([key, doctors]) => {
					return (
						<div key={key}>
							<h3 className="text-2xl font-semibold mb-3">{key}</h3>

							<div className="space-y-1">
								{doctors.map(doctor => {
									return (
										<div>
											<a href={`/doctors/${doctor.slug}`} title={`Dr. ${doctor.name}`} className="hover:underline">Dr. {doctor.name}</a>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}