import { readFileSync } from "fs";
import { parse } from 'csv-parse/sync';

export type Config = {
	base: string;
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

			badges: d['Badges'].split(', ')
		}

		return treatment;
	});
}

export const getConfig = async (): Promise<Config> => await getJSONFile<Config>('config');
export const getTreatments = async (): Promise<Treatment[]> => await getCSVFile<Treatment>('clinics');