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

export type Treatment = {
	method: string;
	grafts: {
		from: number;
		to: number;
	};
	clinic: {
		name: string;
		url: string;
		imagePath: string;
		city: string;
		country: string;
		countryCode: string;
		languages: string[];
	};
	price: {
		local_price: number;
		local_currency: string;
		usd_price: number;
	};

	review: {
		score: number;
		source: string;
		totalReviews: number;
	}

	badges: string[];
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

export type HomePage = {
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
const getCSVFile = async <T>(file: string): Promise<T[]> => {
	const content = readFileSync(`${process.cwd()}/src/content/${file}.csv`, 'utf-8');
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
				to: parseFloat(maxGrafts ?? d['Grafts']),
			},

			clinic: {
				name: d['ClinicName'],
				url: d['URL'],
				imagePath: d['LogoName'],

				city: d['City'],
				country: d['Country'],
				countryCode: d['Country Code'],

				languages: d['Languages'].split(', ')
			},

			price: {
				local_price: parseFloat(d['local_price']),
				local_currency: d['local_currency'],

				usd_price: parseFloat(d['usd_price']),
			},

			review: {
				score: parseFloat(d['Review Score']),
				source: d['Source'],
				totalReviews: d['Total Reviews'],
			},

			badges: d['Method'].split(', ')
		}

		return treatment;
	});
}

export const getConfig = async (): Promise<Config> => await getJSONFile<Config>('config');
export const getTreatments = async (): Promise<Treatment[]> => await getCSVFile<Treatment>('clinics');

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