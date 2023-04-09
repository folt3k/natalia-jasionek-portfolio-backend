import { NextFunction, Router, Request, Response } from "express";
import { getImageCategories, getImages } from "./images.service";

const router = Router();

router.get(
  "/image-categories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await getImageCategories();

      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/images",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const images = await getImages(req.query);

      res.json(images);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
