import { type Request, type Response, Router } from "express";

const generateCourseLayoutRoutes = Router();

generateCourseLayoutRoutes.post("/", async (req: Request, res: Response) => {
    res.status(200).send("working");
})

export default generateCourseLayoutRoutes;