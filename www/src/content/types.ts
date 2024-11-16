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

		const treatment: Treatment = {
			method: d['Method'],
			grafts: {
				from: parseFloat(d['Grafts']),
				to: parseFloat(d['Grafts']),
			},

			clinic: {
				name: d['ClinicName'],
				url: d['URL'],

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
			}
		}

		return treatment;
	});
}

export const getConfig = async (): Promise<Config> => await getJSONFile<Config>('config');
export const getTreatments = async (): Promise<Treatment[]> => await getCSVFile<Treatment>('clinics');