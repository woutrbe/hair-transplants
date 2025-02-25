'use client';

import { useEffect, useState } from "react";
import { Clinic } from "../../content/types";
import { Input } from "@/components/ui/input"
import GoogleMapsComponent from "@/components/GoogleMaps";
import { Formik, useFormikContext } from "formik";
import Checkbox from "../ui/Checkbox";
import ClinicBranchCard from "../ClinicBranchCard";

interface Props {
	clinics: Clinic[];
}

interface FormValues {
	search: string;
	method: string[];
}

export default function CountryPageWrapper({
	clinics
}: Props) {
	const allMethods = Array.from(new Set(clinics.flatMap(c => c.treatments.map(t => t.method))));

	const [filteredClinics, setFilteredClinics] = useState(clinics);

	const initialFormValues: FormValues = {
		search: '',
		method: ['ALL', ...allMethods],
	}

	return <>
		<div className="flex gap-5 relative">
			<div className="w-full md:w-1/4">
				<div className="sticky top-4 border border-gray-300 p-5">
					<Formik
						initialValues={initialFormValues}
						onSubmit={(values: FormValues) => {
							let allClinics = clinics;

							const searchText = values.search.toLowerCase();
							allClinics = allClinics.filter(clinic => {
								return [
									clinic.name.toLowerCase().includes(searchText),
									...clinic.branches.flatMap(branch => [
										branch.city.toLocaleLowerCase().includes(searchText),
										branch.location.toLocaleLowerCase().includes(searchText),
									]),
								].some(value => value)
							});

							allClinics = allClinics.filter(clinic => {
								if (values.method.includes('ALL')) return true;

								const methods = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

								return methods.some(method => values.method.includes(method));
							});

							setFilteredClinics(allClinics);
						}}
					>
						{({
							handleSubmit,
							values,
							handleChange,
							handleBlur,
							resetForm,
							submitForm
						}) => (
							<form onSubmit={handleSubmit}>
								<div className="space-y-5 filters">
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

									<div className="filter">
										<Input
											name="search"
											placeholder="Search clinics..."
											className="flex-grow"
											value={values.search}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</div>

									<div className="filter">
										<div className="filter__title">Treatment method</div>

										<div className="space-y-2">
											{['ALL', ...allMethods].map(t => t).filter(t => t.length > 0).map(option => (
												<Checkbox key={option} name="method" value={option} htmlFor={option} label={option} />
											))}
										</div>
									</div>

									<div>
										<button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-md px-5 py-3" type="submit">Find your clinic</button>
									</div>
								</div>

								<AutoSubmitForm />
							</form>
						)}
					</Formik>
				</div>
			</div>

			<div className="w-full md:w-3/4">
				<div className="space-y-6">
					{filteredClinics.map((clinic, index) => clinic.branches.flatMap(branch => {
						return <ClinicBranchCard key={index} clinic={clinic} branch={branch} />
					}))}
				</div>
			</div>
		</div>

		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4 text-center">Clinic Locations</h2>
			<GoogleMapsComponent clinics={filteredClinics} />
		</div>
	</>;
}

function AutoSubmitForm() {
	const { values, submitForm } = useFormikContext();

	useEffect(() => {
		submitForm();
	}, [values, submitForm]);

	return null;
};