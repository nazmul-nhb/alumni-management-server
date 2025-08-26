import validateRequest from '@/middlewares/validateRequest';
import { alumnusControllers } from '@/modules/alumnus/alumnus.controllers';
import { alumnusValidations } from '@/modules/alumnus/alumnus.validation';
import { Router } from 'express';

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
