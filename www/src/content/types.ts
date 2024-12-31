import { readFileSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import { parse } from 'csv-parse/sync';

export type Config = {
	navigation: [
		{
			link: [string, string],
			sub: [string, string][],
		}
	],
}

export type Country = {
	cc: string;
	slug: string;
	name: string;
}

export type Clinic = {
	slug: string;

	name: string;
	url: string;
	imagePath: string;

	location: string;
	city: string;
	country: string;
	countryCode: string;

	languages: string[];

	consulationPriceIncluded: boolean;
	consulationOnline: boolean;

	formAvailable: boolean;
	formUrl: string;

	review: {
		score: number;
		source: string;
		totalReviews: number;
	}

	treatments?: Treatment[];
}

export type Treatment = {
	method: string;
	grafts: {
		from: number;
		to: number;
	};
	package_size: string;
	price: {
		local_price: number;
		local_currency: string;
		usd_price: number;
	};

	clinic_slug: string;
}
export type TreatmentWithClinic = Treatment & {
	clinic: Clinic;
}

export type Page = {
	content: string;
	data: {
		title: string;
		description: string;
		slug: string;
		faq: {
			q: string;
			a: string;
		}[];
	}
}

const getJSONFile = async <T>(file: string): Promise<T> => {
	const content = readFileSync(`${process.cwd()}/src/content/${file}.json`, 'utf-8');
	return JSON.parse(content) as T;
}

export const getConfig = async (): Promise<Config> => await getJSONFile<Config>('config');

export const getCountries = async (): Promise<Country[]> => {
	const data = await getJSONFile<Country[]>('countries');
	return data;
}
export const getCountry = async (slug: string): Promise<Country> => {
	const data = await getJSONFile<Country[]>('countries');
	const country = data.find(c => c.slug === slug);
	if(!country) {
		throw new Error(`Country not found ${slug}`);
	}

	return country;
}
export const getCountryByCC = async (CC: string): Promise<Country> => {
	const data = await getJSONFile<Country[]>('countries');
	const country = data.find(c => c.slug === CC);
	if(!country) {
		throw new Error(`Country not found ${CC}`);
	}

	return country;
}

export const getClinics = async (): Promise<Clinic[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/clinics.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	const treatments: Treatment[] = await getTreatments();
	return parsed.map((d: any) => {
		const clinic: Clinic = {
			slug: d['slug'],

			name: d['ClinicName'],
			url: d['Website'],
			imagePath: d['ClinicImgName'],

			location: d['Location'],
			city: d['City'],
			country: d['Country'],
			countryCode: d['Country Code'],

			languages: d['Languages'].split(', '),

			consulationPriceIncluded: d['ConsultationPriceIncluded'] === 'Yes',
			consulationOnline: d['ConsultationOnline'] === 'Yes',

			formAvailable: d['FormAvailable'] === 'Yes',
			formUrl: d['FormURL'],

			review: {
				score: parseFloat(d['Review Score']),
				source: d['Source'],
				totalReviews: d['Total Reviews'],
			},

			treatments: treatments.filter(t => t.clinic_slug === d['slug']),
		}

		return clinic;
	})
}
export const getClinic = async (slug: string): Promise<Clinic> => {
	const clinics = await getClinics();
	const clinic = clinics.find(c => c.slug === slug);

	if(!clinic) {
		throw new Error(`Clinic not found ${slug}`);
	}

	return clinic;
}

export const getTreatments = async (): Promise<Treatment[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/products.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	return parsed.map((d: any) => {
		const [minGrafts, maxGrafts] = d['Grafts'].split(' - ');

		const treatment: Treatment = {
			method: d['Method'],
			grafts: {
				from: parseFloat(minGrafts),
				to: parseFloat(maxGrafts ?? minGrafts),
			},
			package_size: d['Package_size'],

			price: {
				local_price: parseFloat(d['local_price']),
				local_currency: d['local_currency'],

				usd_price: parseFloat(d['usd_price']),
			},

			clinic_slug: d['slug_clinic'],
		}

		return treatment;
	})
};

const getMarkdownFiles = async <T>(directory: string): Promise<T[]> => {
	const files = await glob(`${process.cwd()}/src/content/${directory}/**/*.md`);
	return await Promise.all(files.map(f => {
		const content = readFileSync(f, 'utf-8');
		return matter(content) as T;
	}));
}

export const getPages = async (): Promise<Page[]> => await getMarkdownFiles<Page>('pages');
export const getPage = async (slug: string): Promise<Page> => {
	const page = (await getMarkdownFiles<Page>('pages')).find(p => p.data.slug === slug);
	if(!page) throw new Error(`Page ${slug} not found.`);

	return page;
};
export const getHomepage = async (): Promise<Page> => {
	const content = readFileSync(`${process.cwd()}/src/content/homepage.md`, 'utf-8');
	return matter(content) as unknown as Page;
};