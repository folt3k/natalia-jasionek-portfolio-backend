import { Router } from "express";

import imagesController from "./images/images.controller";

const router = Router();

const api = router.use(imagesController);

export default router.use("/api", api);
