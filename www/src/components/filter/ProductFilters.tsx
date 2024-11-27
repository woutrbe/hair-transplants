'use client';

import { Treatment } from "../../content/types"
import { Formik, Field } from "formik";
import Slider from 'rc-slider';
import Checkbox from "../ui/Checkbox";

import { continents, getCountryData, ICountryData, TContinentCode, TCountryCode } from 'countries-list';
import { useEffect, useMemo } from "react";

interface Props {
	treatments: Treatment[];

	onSubmit: (treatments: Treatment[]) => void;
}

interface FormFilterValues {
	minPrice: number;
	maxPrice: number;

	package_size: string;
	rating: string;

	method: string[];
	country: string[];
}

export default function ProductFilters({
	treatments,

	onSubmit
}: Props) {
	const initialValues: FormFilterValues = {
		minPrice: 2500,
		maxPrice: 15000,

		package_size: 'M',
		rating: '0-5',

		method: ['FUE'],
		country: Array.from(new Set(treatments.map(t => t.clinic.countryCode))),
	}

	const countriesByContinent: { [key: string]: ICountryData[] } = useMemo(() => {
		const uniqueCountries: TCountryCode[] = Array.from(new Set(treatments.map(t => t.clinic.countryCode as TCountryCode)));

		const groupedCountries: { [key: string]: ICountryData[] } = {};
		uniqueCountries.map(c => getCountryData(c)).forEach(country => {
			if (!groupedCountries[country.continent]) {
				groupedCountries[country.continent] = [];
			}

			groupedCountries[country.continent].push(country);
		});

		return groupedCountries;
	}, [treatments])

	const filterTreatments = (treatments: Treatment[], filters: FormFilterValues): Treatment[] => {
		// Method
		treatments = treatments.filter(t => filters.method.includes(t.method));

		// Price
		treatments = treatments.filter(t => t.price.usd_price >= filters.minPrice && t.price.usd_price <= filters.maxPrice);

		// Package size
		treatments = treatments.filter(t => filters.package_size.includes(t.package_size));

		// Rating
		const [minRating, maxRating] = filters.rating.split('-');
		if (minRating && maxRating) {
			treatments = treatments.filter(t => t.review.score > parseFloat(minRating) && t.review.score < parseFloat(maxRating));
		}

		// Countries
		treatments = treatments.filter(t => filters.country.includes(t.clinic.countryCode));

		return treatments;
	}

	useEffect(() => {
		onSubmit(filterTreatments(treatments, initialValues));
	}, []);

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
								<div className="filter__title">Transplantation size</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									{[
										['XS', 'XS', '1500'],
										['S', 'Small', '2000'],
										['M', 'Medium', '2500'],
										['L', 'Large', '3000'],
										['XL', 'XL', '4000'],
										['XXL', 'XXL', '5000'],
									].map(([value, text, follicles]) => {
										return (
											<label
												key={value}
												className="border border-gray-300 rounded relative flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer has-[:checked]:border-gray-600 has-[:checked]:bg-gray-100"
												htmlFor={value}
											>
												<Field
													type="radio"
													name="package_size"
													id={value}
													value={value}
													className="hidden peer"
												/>
												<div className="font-bold text-lg">{text}</div>
												<div className="text-gray-300 font-sm">{follicles}</div>
												<div className="text-gray-300 font-sm">follicles</div>
											</label>
										)
									})}
								</div>
							</div>

							<div className="filter">
								<div className="filter__title">Your budget</div>

								<div>
									<div className="text-sm text-gray-700 mb-1">
										US$ {values.minPrice.toLocaleString('en-US')} - US$ {values.maxPrice.toLocaleString('en-US')}
									</div>
									<Slider range allowCross={false} value={[values.minPrice, values.maxPrice]} defaultValue={[values.minPrice, values.maxPrice]} min={2500} max={15000} step={500} onChange={value => {
										const [min, max] = value as [number, number];
										setFieldValue('minPrice', min);
										setFieldValue('maxPrice', max);
									}} />
								</div>
							</div>

							<div className="filter">
								<div className="filter__title">Rating</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
									{[
										['0-5', 'ALL'],
										['3-5', '3+'],
										['4-5', '4+'],
										['4.5-5', '4.5+'],
										['4.85-5', '4.85+'],
									].map(([value, text]) => {
										return (
											<label
												key={value}
												className="border border-gray-300 rounded relative flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer has-[:checked]:border-gray-600 has-[:checked]:bg-gray-100"
												htmlFor={value}
											>
												<Field
													type="radio"
													name="rating"
													id={value}
													value={value}
													className="hidden peer"
												/>
												<div className="font-bold text-lg">{text}</div>
											</label>
										)
									})}
								</div>
							</div>

							<div className="filter">
								<div className="filter__title">Clinic location</div>

								{Object.keys(countriesByContinent).map(continent => {
									const countries = countriesByContinent[continent];

									return (
										<div key={continent} className="mb-2">
											<div className="font-semibold">{continents[continent as TContinentCode]}</div>

											<div className="space-y-1">
												{countries.map(country => {
													return (
														<div key={country.iso2}>
															<Checkbox key={country.iso2} name="country" value={country.iso2} htmlFor={country.iso2} label={country.name} />
														</div>
													)
												})}
											</div>
										</div>
									)
								})}
							</div>

							<div className="filter">
								<div className="filter__title">Treatment method</div>

								<div className="space-y-2">
									{Array.from(new Set(treatments.map(t => t.method))).map(option => (
										<Checkbox key={option} name="method" value={option} htmlFor={option} label={option} />
									))}
								</div>
							</div>

							<div>
								<button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-md px-5 py-3" type="submit">Find your clinic</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</Formik>
	)
};