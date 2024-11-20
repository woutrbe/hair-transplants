'use client';

import { useState } from "react";
import { Treatment } from "../../content/types";
import TreatmentCard from "../TreatmentCard";
import ProductFilters from "./ProductFilters";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
	treatments: Treatment[];
}

export default function ProductFilterWrapper({
	treatments
}: Props) {
	const [sortBy, setSortBy] = useState<string>('rating-asc');
	const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSortingChange = (value: string) => {
		setSortBy(value);

		onSubmit(treatments, value);
	}

	const onSubmit = (treatments: Treatment[], sortBy = 'rating-asc') => {
		// Sorting
		switch(sortBy) {
			case 'rating-asc':
				treatments = treatments.sort((a, b) => {
					return b.review.score - a.review.score;
				});
			case 'rating-desc':
				treatments = treatments.sort((a, b) => {
					return a.review.score - b.review.score;
				});
			case 'price-desc':
				treatments = treatments.sort((a, b) => {
					return b.price.usd_price - a.price.usd_price;
				});
			case 'price-asc':
				treatments = treatments.sort((a, b) => {
					return a.price.usd_price - b.price.usd_price;
				});
		}

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
				<div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-2 mb-5">
					<div>
						<Select onValueChange={onSortingChange} defaultValue={sortBy}>
							<SelectTrigger>
								<SelectValue placeholder="Clinic Rating (high to low)" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Sort by:</SelectLabel>
									<SelectItem value="rating-asc">Clinic Rating (high to low)</SelectItem>
									<SelectItem value="rating-desc">Clinic Rating (low to high)</SelectItem>
									<SelectItem value="price-desc">Price (highest first)</SelectItem>
									<SelectItem value="price-asc">Price (lowest first)</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

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