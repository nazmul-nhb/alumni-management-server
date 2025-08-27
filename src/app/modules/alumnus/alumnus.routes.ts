import { ADMIN_ROLES } from '@/constants';
import authorizeUser from '@/middlewares/authorizeUser';
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

router.get('/', authorizeUser(...ADMIN_ROLES), alumnusControllers.getAllAlumni);

router.get('/:id', alumnusControllers.getSingleAlumnus);

router.patch(
	'/:id',
	validateRequest(alumnusValidations.updateSchema),
	authorizeUser(...ADMIN_ROLES),
	alumnusControllers.updateAlumnus
);

router.delete('/:id', authorizeUser(...ADMIN_ROLES), alumnusControllers.deleteAlumnus);

export const alumnusRoutes = router;
