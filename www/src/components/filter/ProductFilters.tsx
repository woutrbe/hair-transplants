'use client';

import { Treatment } from "../../content/types"
import { Formik } from "formik";
import Slider from 'rc-slider';
import Checkbox from "../ui/Checkbox";

import { continents, getCountryData, ICountryData, TContinentCode, TCountryCode } from 'countries-list';
import { useMemo } from "react";

interface Props {
	treatments: Treatment[];

	onSubmit: (treatments: Treatment[]) => void;
}

interface FormFilterValues {
	minPrice: number;
	maxPrice: number;

	grafts: string[];

	method: string[];
	country: string[];
}

export default function ProductFilters({
	treatments,

	onSubmit
}: Props) {
	const initialValues: FormFilterValues = {
		minPrice: 0,
		maxPrice: 100000,

		grafts: ['0-1500', '1500-3000', '3000-10000'],

		method: Array.from(new Set(treatments.map(t => t.method))),
		country: Array.from(new Set(treatments.map(t => t.clinic.countryCode))),
	}

	const countriesByContinent: {[key: string]: ICountryData[]} = useMemo(() => {
		const uniqueCountries: TCountryCode[] = Array.from(new Set(treatments.map(t => t.clinic.countryCode as TCountryCode)));

		const groupedCountries: {[key: string]: ICountryData[]} = {};
		uniqueCountries.map(c => getCountryData(c)).forEach(country => {
			if(!groupedCountries[country.continent]) {
				groupedCountries[country.continent] = [];
			}

			groupedCountries[country.continent].push(country);
		});

		return groupedCountries;
	}, [treatments])

	const filterTreatments = (treatments: Treatment[], filters: FormFilterValues): Treatment[] => {
		console.log(filters);

		// Method
		treatments = treatments.filter(t => filters.method.includes(t.method));

		// Price
		treatments = treatments.filter(t => t.price.usd_price >= filters.minPrice && t.price.usd_price <= filters.maxPrice);

		// Grafts
		const allGraftRanges = filters.grafts.flatMap(graft => {
			const [min, max] = graft.split('-');
			return [parseInt(min), parseInt(max)];
		}).sort((a, b) => a - b);
		if(allGraftRanges.length) {
			const minGrafts = allGraftRanges.shift();
			const maxGrafts = allGraftRanges.pop();

			if(minGrafts && maxGrafts) {
				treatments = treatments.filter(t => t.grafts.from > minGrafts && t.grafts.to < maxGrafts);
			}
		}

		// Countries
		treatments = treatments.filter(t => filters.country.includes(t.clinic.countryCode));

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

								<div className="space-y-2">
									{[
										['Low', '0-1500'],
										['Medium', '1500-3000'],
										['High', '3000-10000']
									].map(([text, value]) => (
										<Checkbox key={value} name="grafts" value={value} htmlFor={value} label={text} />
									))}
								</div>
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
								<button className="w-full bg-blue-500 hover:bg-blue-700 text-white rounded-md px-5 py-3" type="submit">Find your clinic</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</Formik>
	)
};