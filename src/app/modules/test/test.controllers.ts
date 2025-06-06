import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { testServices } from './test.services';

const getAllTests = catchAsync(async (_req, res) => {
	const tests = await testServices.getAllTestsFromDB();

	sendResponse(res, 'Test', 'GET', tests);
});

export const testControllers = { getAllTests };
