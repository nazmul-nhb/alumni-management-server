import { Router } from 'express';
import { testControllers } from './test.controllers';

const router = Router();

router.get('/', testControllers.getAllTests);

export const testRoutes = router;
