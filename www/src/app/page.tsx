import { Metadata } from "next";
import { getTreatments } from "../content/types";
import ProductFilterWrapper from "../components/filter/ProductFilterWrapper";

export const metadata: Metadata = {
	title: "HairCompare - Expert doctors ready to help you achieve the hair you've always wanted.",
	description: "We find the best clinics for your hair transplant surgery",
}

export default async function Home() {
	const treatments = await getTreatments();

	return (
		<>
			<div>
				<ProductFilterWrapper treatments={treatments} />
			</div>
		</>
	);
}
