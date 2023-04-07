import { NextFunction, Router, Request, Response } from "express";
import { CdnProviderNotificationTypes } from "./cdn-provider.types";
import {
  onCreateFolderNotification,
  onUploadImageNotification,
} from "./cdn-provider.service";

const router = Router();

router.post(
  "/cdn-provider-notification",
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationType: CdnProviderNotificationTypes =
      req.body.notification_type;

    try {
      switch (notificationType) {
        case CdnProviderNotificationTypes.CreateFolder:
          await onCreateFolderNotification(req.body);
          break;
        case CdnProviderNotificationTypes.UploadImage:
          await onUploadImageNotification(req.body);
          break;
      }
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
