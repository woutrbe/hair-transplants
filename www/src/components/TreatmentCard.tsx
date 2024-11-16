import { Treatment } from "../content/types";

export default function TreatmentCard({
	treatment
}: {
	treatment: Treatment;
}) {
	return (
		<div className="border border-gray-300 rounded-lg p-4">
			{treatment.clinic.name}
		</div>
	)
}