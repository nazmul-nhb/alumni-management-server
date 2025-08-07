import { Router } from 'express';
import { alumnusControllers } from './alumnus.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { alumnusValidations } from './alumnus.validation';

const router = Router();

router.post(
	'/',
	validateRequest(alumnusValidations.creationSchema),
	alumnusControllers.createAlumnus
);

router.get('/', alumnusControllers.getAllAlumni);

router.get('/:id', alumnusControllers.getSingleAlumnus);

router.patch(
	'/:id',
	validateRequest(alumnusValidations.updateSchema),
	alumnusControllers.updateAlumnus
);

router.delete('/:id', alumnusControllers.deleteAlumnus);

export const alumnusRoutes = router;
