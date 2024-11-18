'use client';

import { useState } from "react";
import { Treatment } from "../../content/types";
import TreatmentCard from "../TreatmentCard";
import ProductFilters from "./ProductFilters";
import { Loader2 } from "lucide-react";

interface Props {
	treatments: Treatment[];
}

export default function ProductFilterWrapper({
	treatments
}: Props) {
	const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (treatments: Treatment[]) => {
		console.log('onSubmit');

		setFilteredTreatments(treatments);

		// Fake loading indicator
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}

	return (
		<div className="flex space-x-10">
			<div className="w-4/12">
				<div className="border border-gray-300 rounded p-5">
					<ProductFilters treatments={treatments} onSubmit={onSubmit} />
				</div>
			</div>

			<div className="w-8/12">
				<div className="bg-white sticky top-0 z-10 shadow-md text-center">
					<div className="grid grid-cols-4 gap-6 p-4 text-sm font-semibold text-muted-foreground">
					<div>Clinic</div>
					<div>Reviews</div>
					<div>Total Price</div>
					<div>Price per Graft</div>
					</div>
				</div>
			
				<div className="flex justify-end border-b border-gray-300 pb-2 pt-2 mb-5">
					<div className="text-sm text-gray-700">Showing <strong>{filteredTreatments.length}</strong> options available</div>
				</div>
			
				<div className="space-y-5">
					{isLoading && <div className='flex items-center justify-center py-10'>
						<Loader2 className='size-10 animate-spin' />
					</div>}

					{!isLoading && filteredTreatments.map((t, i) => <TreatmentCard treatment={t} key={i} />)}
				</div>
			</div>
		</div>
	)
}