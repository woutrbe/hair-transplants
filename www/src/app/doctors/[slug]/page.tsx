import { Metadata } from "next";
import { getClinic, getDocotor, getDoctors } from "../../../content/types";
import ClinicCard from "../../../components/ClinicCard";

interface Props {
	params: {
		slug: string;
	}
}

export async function generateStaticParams() {
	const doctors = await getDoctors();

	return doctors.map(doctor => ({
		slug: doctor.slug,
	}))
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const doctor = await getDocotor(props.params.slug);

	return {
		title: `Hair transplant doctor ${doctor.name}`,
		description: `Hair transplant doctor ${doctor.name}`,

		alternates: {
			canonical: `${process.env.URL}/doctors/${props.params.slug}`,
		}
	}
}

export default async function DoctorPage(props: Props) {
	const doctor = await getDocotor(props.params.slug);
	const clinic = await getClinic(doctor.clinic_slug);

	return (
		<div>
			<div className="border-b border-gray-300 py-10 text-center mb-10">
				<h4 className="font-semibold text-3xl mb-2">Dr. {doctor.name}</h4>
				<p className="text-gray-800">Hair transplant specialist</p>
			</div>

			<div className="flex flex-col md:flex-row gap-10">
				<div className="w-full md:w-1/4">
					<div className="border border-gray-300 border-t-2 border-t-purple-600 p-5">
						<h5 className="font-semibold mb-5">Profile details</h5>

						{doctor.img && <div className="mb-2">
							<img src={doctor.img} title={doctor.name} alt={doctor.name} className="w-32 h-32 rounded-full" />
						</div>}

						<div className="font-semibold">Dr. {doctor.name}</div>
						{doctor.website && <div><a href={doctor.website} target="_blank">{doctor.website}</a></div>}
					</div>
				</div>

				<div className="w-full md:w-3/4">
					{clinic && <ClinicCard clinic={clinic} />}
				</div>
			</div>
		</div>
	)
}