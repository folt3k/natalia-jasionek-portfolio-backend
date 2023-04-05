import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.post(
  "/cloudinary-event",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
  }
);

export default router;
