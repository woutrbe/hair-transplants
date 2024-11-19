'use client';

import { Treatment } from "../../content/types"
import { Formik } from "formik";
import Slider from 'rc-slider';
import Checkbox from "../ui/Checkbox";

interface Props {
	treatments: Treatment[];

	onSubmit: (treatments: Treatment[]) => void;
}

interface FormFilterValues {
	minPrice: number;
	maxPrice: number;

	minGrafts: number;
	maxGrafts: number;

	method: string[];
}

export default function ProductFilters({
	treatments,

	onSubmit
}: Props) {
	const initialValues: FormFilterValues = {
		minPrice: 0,
		maxPrice: 100000,

		minGrafts: 1000,
		maxGrafts: 10000,

		method: Array.from(new Set(treatments.map(t => t.method))),
	}

	const filterTreatments = (treatments: Treatment[], filters: FormFilterValues): Treatment[] => {
		console.log({
			treatments,
			filters
		});

		// Method
		treatments = treatments.filter(t => filters.method.includes(t.method));

		// Price
		treatments = treatments.filter(t => t.price.usd_price >= filters.minPrice && t.price.usd_price <= filters.maxPrice);

		// Grafts
		treatments = treatments.filter(t => t.grafts.from > filters.minGrafts && t.grafts.to < filters.maxGrafts);

		return treatments;
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values: FormFilterValues) => {
				onSubmit(filterTreatments(treatments, values));
			}}
		>
			{({
				resetForm,
				submitForm,
				handleSubmit,
				values,
				setFieldValue
			}) => (
				<div className="filters">
					<div className="border-b border-gray-300 pb-2 flex justify-between items-center mb-5">
						<div className="text-xl font-semibold">Filters</div>
						<div
							className="border border-gray-300 rounded px-5 py-2 text-sm cursor-pointer hover:bg-gray-100"
							onClick={() => {
								resetForm();
								submitForm();
							}}
						>Clear filters</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="space-y-5">
							<div className="filter">
								<div className="filter__title">Your budget</div>

								<div>
									<div className="text-sm text-gray-700 mb-1">
										US$ {values.minPrice.toLocaleString('en-US')} - US$ {values.maxPrice.toLocaleString('en-US')}
									</div>
									<Slider range allowCross={false} value={[values.minPrice, values.maxPrice]} defaultValue={[values.minPrice, values.maxPrice]} min={0} max={100000} step={1000} onChange={value => {
										const [min, max] = value as [number, number];
										setFieldValue('minPrice', min);
										setFieldValue('maxPrice', max);
									}} />
								</div>
							</div>

							<div className="filter">
								<div className="filter__title">Grafts</div>

								<div>
									<div className="text-sm text-gray-700 mb-1">
										{values.minGrafts.toLocaleString('en-US')} - {values.maxGrafts.toLocaleString('en-US')}
									</div>
									<Slider range allowCross={false} value={[values.minGrafts, values.maxGrafts]} defaultValue={[values.minGrafts, values.maxGrafts]} min={1000} max={10000} step={200} onChange={value => {
										const [min, max] = value as [number, number];
										setFieldValue('minGrafts', min);
										setFieldValue('maxGrafts', max);
									}} />
								</div>
							</div>

							<div className="filter">
								<div className="filter__title">Treatment method</div>

								<div className="space-y-2">
									{Array.from(new Set(treatments.map(t => t.method))).map(option => (
										<Checkbox key={option} name="method" value={option} checked={false} htmlFor={option} label={option} />
									))}
								</div>
							</div>

							<div>
								<button className="w-full bg-blue-500 hover:bg-blue-700 text-white rounded-md px-5 py-3" type="submit">Find your clinic</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</Formik>
	)
};