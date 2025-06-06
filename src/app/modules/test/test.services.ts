import { QueryBuilder } from '../../classes/QueryBuilder';
import { Test } from './test.model';

const getAllTestsFromDB = async (query?: Record<string, unknown>) => {
	const testQuery = new QueryBuilder(Test.find(), query).sort();
	// const tests = await Test.find({});

	const tests = await testQuery.modelQuery;

	return tests;
};

export const testServices = { getAllTestsFromDB };
