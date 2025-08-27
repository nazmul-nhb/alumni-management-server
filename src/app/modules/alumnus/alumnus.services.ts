import { ErrorWithStatus } from '@/classes/ErrorWithStatus';
import { QueryBuilder } from '@/classes/QueryBuilder';
import { Alumnus } from '@/modules/alumnus/alumnus.model';
import type { IAlumnus } from '@/modules/alumnus/alumnus.types';
import { flattenObjectDotNotation } from 'nhb-toolbox';
import { STATUS_CODES } from 'nhb-toolbox/constants';
import type { DeepPartial } from 'nhb-toolbox/utils/types';

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

const getSingleAlumnusFromDB = async (id: string) => {
	const alumnus = await Alumnus.findAlumnusById(id);

	return alumnus;
};

const updateAlumnusInDB = async (id: string, payload: DeepPartial<IAlumnus>) => {
	const flattened = flattenObjectDotNotation(payload);

	const updatedAlumnus = await Alumnus.findOneAndUpdate({ _id: id }, flattened, {
		runValidators: true,
		new: true,
	});

	if (!updatedAlumnus) {
		throw new ErrorWithStatus(
			'Not Updated Error',
			`Cannot update specified alumnus with ID ${id}!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'update_alumnus'
		);
	}

	return updatedAlumnus;
};

const deleteAlumnusFromDB = async (id: string) => {
	const result = await Alumnus.deleteOne({ _id: id });

	if (result.deletedCount < 1) {
		throw new ErrorWithStatus(
			'Delete Failed Error',
			`Failed to delete alumnus with ID ${id}!`,
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'delete_alumnus'
		);
	}
};

export const alumnusServices = {
	createAlumnusInDB,
	getAllAlumniFromDB,
	getSingleAlumnusFromDB,
	updateAlumnusInDB,
	deleteAlumnusFromDB,
};
