import { Router } from 'express';
import generateCourseLayoutRoutes from './generate-course-layout';
const router = Router();

router.post('/generate-course-layout', generateCourseLayoutRoutes);

export default router;


