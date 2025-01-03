'use client';

import { useEffect, useState } from "react";
import { Clinic } from "../../content/types";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GoogleMapsComponent from "@/components/GoogleMaps";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Globe, MapPin, MessageCircle, Scissors } from "lucide-react";
import StarRating from "../StarRating";
import { Formik, useFormikContext } from "formik";

interface Props {
	clinics: Clinic[];
}

interface FormValues {
	search: string;
	method: string;
}

export default function CountryPageWrapper({
	clinics
}: Props) {
	const [filteredClinics, setFilteredClinics] = useState(clinics);

	const initialFormValues: FormValues = {
		search: '',
		method: 'all',
	}

	return <>
		<Formik
			initialValues={initialFormValues}
			onSubmit={(values: FormValues) => {
				let allClinics = clinics;

				console.log(allClinics);

				const searchText = values.search.toLowerCase();
				allClinics = allClinics.filter(clinic => {
					return [
						clinic.name.toLowerCase().includes(searchText),
						clinic.city.toLocaleLowerCase().includes(searchText),
						clinic.location.toLocaleLowerCase().includes(searchText),
					].some(value => value)
				});

				allClinics = allClinics.filter(clinic => {
					if(values.method === 'all') return true;

					const methods = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

					return methods.includes(values.method);
				});

				setFilteredClinics(allClinics);
			}}
		>
			{({
				handleSubmit,
				values,
				setFieldValue,
				handleChange,
				handleBlur
			}) => (
				<form onSubmit={handleSubmit}>
					<div className="mb-8 flex flex-col sm:flex-row gap-4">
						<Input
							name="search"
							placeholder="Search clinics..."
							className="flex-grow"
							value={values.search}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Select
							value={values.method}
							onValueChange={(value: string) => {
								setFieldValue('method', value);
							}}
						>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="Filter by specialty" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Specialties</SelectItem>
								<SelectItem value="DHI">DHI</SelectItem>
								<SelectItem value="FUE">FUE</SelectItem>
								<SelectItem value="Micro FUE">Micro FUE</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<AutoSubmitForm />
				</form>
			)}
		</Formik>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{filteredClinics.map((clinic, index) => {
				const languageArray = clinic.languages;
				const methodsArray = Array.from(new Set((clinic.treatments || []).map(t => t.method)));

				return (
					<Card key={index} className="w-full group relative overflow-hidden">
						<CardHeader className="flex flex-col items-center space-y-4 pb-6">
							<div className="w-32 h-32 overflow-hidden flex items-center justify-center">
								<img
									src={`/clinics/${clinic.imagePath}`}
									alt={`${clinic.name} logo`}
									width={200}
									height={60}
									className="rounded-lg"
								/>
							</div>
							<CardTitle className="text-xl font-bold text-center">
								<a href={`/clinics/${clinic.slug}`} title={clinic.name}>
									{clinic.name}
								</a>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Globe className="h-4 w-4" />
										<a href={clinic.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.url}</a>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<MapPin className="h-4 w-4" />
									<span>{clinic.location}, {clinic.city}, {clinic.country}</span>
								</div>
								<div className="flex items-center space-x-2">
									<MessageCircle className="h-4 w-4" />
									<div className="flex flex-wrap gap-1">
										{languageArray.map((lang, index) => (
											<Badge key={index} variant="secondary">{lang}</Badge>
										))}
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<StarRating rating={clinic.review.score} />
									<div className="text-sm text-muted-foreground">
										<a href={clinic.review.source} target="blank" className="hover:underline">{clinic.review.score} stars, {clinic.review.totalReviews} reviews</a>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Scissors className="h-4 w-4" />
									<div className="flex flex-wrap gap-1">
										{methodsArray.map((method, index) => (
											<Badge key={index} variant="secondary">{method}</Badge>
										))}
									</div>
								</div>
								<div>
									{/* <span className="font-semibold">Consultation:</span> {clinic.ConsultationPrice === 0 ? 'Free' : `${clinic.ConsultationPrice} ${clinic.local_currency}`} */}
									{clinic.consulationOnline && <Badge className="ml-2" variant="outline">Online Available</Badge>}
								</div>
							</div>
						</CardContent>
						<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-700 bg-opacity-50">
							<a
								href={`/clinics/${clinic.slug}`}
								className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg px-5 py-3 inline-flex items-center gap-2"
								title="Learn More"
							>
								Learn More
							</a>
						</div>
					</Card>
				)
			})}
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