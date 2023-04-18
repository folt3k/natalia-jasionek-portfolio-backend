import { NextFunction, Request, Response, Router } from "express";
import { CdnProviderNotificationTypes } from "./cdn-provider.types";
import {
  onCreateFolderNotification,
  onMoveImagesToFolder,
  onRemoveImage,
  onUploadImageNotification,
} from "./cdn-provider.service";

const router = Router();

router.post(
  "/cdn-provider-notification",
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationType: CdnProviderNotificationTypes =
      req.body.notification_type;

    console.log(req.body);

    try {
      switch (notificationType) {
        case CdnProviderNotificationTypes.CreateFolder:
          await onCreateFolderNotification(req.body);
          break;
        case CdnProviderNotificationTypes.UploadImage:
          await onUploadImageNotification(req.body);
          break;
        case CdnProviderNotificationTypes.MoveToFolder:
          await onMoveImagesToFolder(req.body);
          break;
        case CdnProviderNotificationTypes.DeleteImage:
          await onRemoveImage(req.body);
          break;
      }
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
