import { readFileSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import { parse } from 'csv-parse/sync';

export type Config = any;

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

	consulationPriceIncluded: boolean;
	consulationOnline: boolean;

	formAvailable: boolean;
	formUrl: string;

	review: {
		avgScore: number;
		totalReviews: number;
	};

	branches: Branch[];
	treatments: Treatment[];
	doctors: Doctor[];
	organisations: Organisation[];

	socials?: {
		linkedin?: string;
		instagram?: string;
		facebook?: string;
		youtube?: string;
		tiktok?: string;
		twitter?: string;
		whatsapp?: string;
	}
}

export type Branch = {
	location: string;
	city: string;
	country: string;
	countryCode: string;

	languages: string[];
	lat: number;
	lng: number;

	review: {
		score: number;
		source: string;
		totalReviews: number;
	}

	localCurrency: string;

	clinic_slug: string;
}

export type Doctor = {
	slug: string;
	name: string;
	img: string;
	description: string;
	website: string;

	clinic_slug: string;
}

export type Organisation = {
	slug: string;
	name: string;
	url: string;
	img: string;
	description: string;
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
	if (!country) {
		throw new Error(`Country not found ${slug}`);
	}

	return country;
}
export const getCountryByCC = async (CC: string): Promise<Country> => {
	const data = await getJSONFile<Country[]>('countries');
	const country = data.find(c => c.slug === CC);
	if (!country) {
		throw new Error(`Country not found ${CC}`);
	}

	return country;
}

export const getClinics = async (): Promise<Clinic[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/Clinics - Clinics.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	const allTreatments: Treatment[] = await getTreatments();
	const allBranches: Branch[] = await getBranches();
	const allDoctors: Doctor[] = await getDoctors();
	const allOrganisations: Organisation[] = await getOrganisations();

	return parsed.map((d: any) => {
		const branches = allBranches.filter(branch => branch.clinic_slug === d['slug']);
		const treatments = allTreatments.filter(treatment => treatment.clinic_slug === d['slug']);
		const doctors = allDoctors.filter(doctor => doctor.clinic_slug === d['slug']);

		const clinic: Clinic = {
			slug: d['slug'],

			name: d['ClinicName'],
			url: d['Website'],
			imagePath: d['ClinicImgName'],

			consulationPriceIncluded: d['ConsultationPriceIncluded'] === 'Yes',
			consulationOnline: d['ConsultationOnline'] === 'Yes',

			formAvailable: d['FormAvailable'] === 'Yes',
			formUrl: d['FormURL'],

			review: {
				avgScore: branches.reduce((sum, branch) => sum + branch.review.score, 0) / branches.length,
				totalReviews: branches.reduce((sum, branch) => sum + branch.review.totalReviews, 0)
			},

			organisations: d['Organisations'].split(',').map((o: string) => {
				return allOrganisations.find(org => org.slug === o)
			}),

			socials: {
				linkedin: d['LinkedIn'],
				instagram: d['Instagram'],
				facebook: d['Facebook'],
				youtube: d['Youtube'],
				tiktok: d['TikTok'],
				twitter: d['X'],
				whatsapp: d['Whatsapp'],
			},

			branches,
			treatments,
			doctors,
		}

		return clinic;
	}).filter((c: Clinic) => c.slug.length);
}
export const getClinic = async (slug: string): Promise<Clinic> => {
	const clinics = await getClinics();
	const clinic = clinics.find(c => c.slug === slug);

	if (!clinic) {
		throw new Error(`Clinic not found ${slug}`);
	}

	return clinic;
}

export const getBranches = async (): Promise<Branch[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/Clinics - Branch.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	return parsed.map((row: any) => {
		const branch: Branch = {
			location: row['Location'],
			city: row['City'],
			country: row['Country'],
			countryCode: row['Country Code'],

			languages: row['Languages'].split(', '),
			lat: row['Lat'],
			lng: row['Lng'],

			localCurrency: row['local_currency'],

			review: {
				score: parseFloat(row['Review Score']),
				source: row['Source'],
				totalReviews: parseFloat(row['Total Reviews']),
			},

			clinic_slug: row['clinic'],
		}

		return branch;
	})
}

export const getDoctors = async (): Promise<Doctor[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/Clinics - Doctors.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	return parsed.map((row: any) => {
		const doctor: Doctor = {
			slug: row['slug'],
			name: row['name'],
			...row['img'] && {
				img: `/doctors/${row['img']}.png`,
			},
			description: row['description'],
			website: row['Website'],

			clinic_slug: row['clinic'],
		}

		return doctor;
	})
}
export const getDocotor = async (slug: string): Promise<Doctor> => {
	const doctors = await getDoctors();
	const doctor = doctors.find(d => d.slug === slug);

	if (!doctor) {
		throw new Error(`Doctor not found ${slug}`);
	}

	return doctor;
}

export const getTreatments = async (): Promise<Treatment[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/Clinics - Products.csv`, 'utf-8');
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

export const getOrganisations = async (): Promise<Organisation[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/Clinics - Societies.csv`, 'utf-8');
	const parsed = parse(content, {
		columns: true,
		skip_empty_lines: true,
	});

	return parsed.map((row: any) => {
		const organisation: Organisation = {
			slug: row['slug'],
			name: row['name'],
			url: row['URL'],
			img: row['img'],
			description: row['Description'],
		}
		return organisation;
	});
}

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
	if (!page) throw new Error(`Page ${slug} not found.`);

	return page;
};

export const getHomepage = async (): Promise<Page> => {
	const content = readFileSync(`${process.cwd()}/src/content/homepage.md`, 'utf-8');
	return matter(content) as unknown as Page;
};