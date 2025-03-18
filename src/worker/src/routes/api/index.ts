import { Router } from 'express';
import generateCourseLayoutRoutes from './generate-course-layout';
const router = Router();

router.use('/generate-course-layout', generateCourseLayoutRoutes);

export default router;