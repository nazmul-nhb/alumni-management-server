import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { alumnusServices } from './alumnus.services';

const createAlumnus = catchAsync(async (req, res) => {
	const alumnus = await alumnusServices.createAlumnusInDB(req.body);

	sendResponse(res, 'Alumnus', 'POST', alumnus);
});

const getAllAlumni = catchAsync(async (_req, res) => {
	const alumni = await alumnusServices.getAllAlumniFromDB();

	sendResponse(res, 'Alumnus', 'GET', alumni, 'Fetched all alumni');
});

export const alumnusControllers = { getAllAlumni, createAlumnus };
