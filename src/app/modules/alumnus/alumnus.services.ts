import { QueryBuilder } from '../../classes/QueryBuilder';
import { Alumnus } from './alumnus.model';
import type { IAlumnus } from './alumnus.types';

const createAlumnusInDB = async (payload: IAlumnus) => {
	const newAlumnus = await Alumnus.create(payload);

	return newAlumnus;
};

const getAllAlumniFromDB = async (query?: Record<string, unknown>) => {
	const alumnusQuery = new QueryBuilder(Alumnus.find(), query).sort();
	// const alumni = await Alumnus.find({});

	const alumni = await alumnusQuery.modelQuery;

	return alumni;
};

export const alumnusServices = { getAllAlumniFromDB, createAlumnusInDB };
