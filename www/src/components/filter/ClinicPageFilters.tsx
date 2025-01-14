'use client';

import { useEffect, useState } from "react";
import { Clinic } from "../../content/types";
import { Input } from "@/components/ui/input"
import GoogleMapsComponent from "@/components/GoogleMaps";
import { Badge } from "../ui/badge";
import { ChevronRight, Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import StarRating from "../StarRating";
import { Formik, useFormikContext } from "formik";
import Checkbox from "../ui/Checkbox";

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
						const allLanguages = Array.from(new Set(clinic.branches.flatMap(b => b.languages)));
						const methodsArray = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

						return (
							<div key={index} className="w-full group border">
								<div className="flex p-5">
									<div className="w-1/2">
										<div className="space-y-4">
											<h3>
												<a href={`/clinics/${clinic.slug}`} title={clinic.name} className="text-xl font-bold hover:underline">
													{clinic.name}
												</a>
											</h3>
											<div>
												<img
													src={`/clinics/${clinic.imagePath}`}
													alt={`${clinic.name} logo`}
													width={200}
													height={60}
													className="rounded-lg"
												/>
											</div>
										</div>
									</div>

									<div className="w-1/2">
										<div className="grid gap-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<Globe className="h-4 w-4" />
													<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<MapPin className="h-4 w-4" />
												<span>{branch.location}, {branch.city}, {branch.country}</span>
											</div>
											<div className="flex items-center space-x-2">
												<MessageCircle className="h-4 w-4" />
												<div className="flex flex-wrap gap-1">
													{allLanguages.map((lang, index) => (
														<Badge key={index} variant="secondary">{lang}</Badge>
													))}
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<StarRating rating={clinic.review.avgScore} />
												<div className="text-sm text-muted-foreground">
													<a href={branch.review.source} target="_blank" className="hover:underline">{branch.review.score} stars, {branch.review.totalReviews} reviews</a>
												</div>
											</div>
											{methodsArray.length > 0 && <div className="flex items-center space-x-2">
												<Scissors className="h-4 w-4" />
												<div className="flex flex-wrap gap-1">
													{methodsArray.map((method, index) => (
														<Badge key={index} variant="secondary">{method}</Badge>
													))}
												</div>
											</div>}
											<div>
												{/* <span className="font-semibold">Consultation:</span> {clinic.ConsultationPrice === 0 ? 'Free' : `${clinic.ConsultationPrice} ${clinic.local_currency}`} */}
												{clinic.consulationOnline && <Badge className="ml-2" variant="outline">Online Available</Badge>}
											</div>
										</div>
									</div>
								</div>

								<div className="bg-gray-50 p-5">
									<a href={`/clinics/${clinic.slug}`} className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2">
										Learn more about {clinic.name}
										<ChevronRight className="w-4 h-4" />
									</a>
								</div>
							</div>
						)
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