import { Router } from "express";

import imagesController from "./images/images.controller";
import cdnProviderController from "./cdn-provider/cdn-provider.controller";

const router = Router();

const api = router.use(imagesController, cdnProviderController);

export default router.use("/api", api);
