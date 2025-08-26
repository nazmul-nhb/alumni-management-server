import catchAsync from '@/utilities/catchAsync';
import sendResponse from '@/utilities/sendResponse';
import { alumnusServices } from '@/modules/alumnus/alumnus.services';

const createAlumnus = catchAsync(async (req, res) => {
	const newAlumnus = await alumnusServices.createAlumnusInDB(req.body);

	sendResponse(res, 'Alumnus', 'POST', newAlumnus);
});

const getAllAlumni = catchAsync(async (_req, res) => {
	const alumni = await alumnusServices.getAllAlumniFromDB();

	sendResponse(res, 'Alumnus', 'GET', alumni);
});

const getSingleAlumnus = catchAsync(async (req, res) => {
	const alumnus = await alumnusServices.getSingleAlumnusFromDB(req?.params?.id);

	sendResponse(res, 'Alumnus', 'GET', alumnus);
});

const updateAlumnus = catchAsync(async (req, res) => {
	const alumnus = await alumnusServices.updateAlumnusInDB(req?.params?.id, req?.body);

	sendResponse(res, 'Alumnus', 'PATCH', alumnus);
});

const deleteAlumnus = catchAsync(async (req, res) => {
	await alumnusServices.deleteAlumnusFromDB(req?.params?.id);

	sendResponse(res, 'Alumnus', 'DELETE');
});

export const alumnusControllers = {
	createAlumnus,
	getAllAlumni,
	getSingleAlumnus,
	updateAlumnus,
	deleteAlumnus,
};
