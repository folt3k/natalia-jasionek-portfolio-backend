import prisma from "../../prisma/client";
import { ImageCategory } from "@prisma/client";

export const onCreateFolderNotification = (dto: { folder_name: string }) => {
  return prisma.imageCategory.create({
    data: {
      name: dto.folder_name,
    },
  });
};

export const onUploadImageNotification = async (dto: {
  asset_id: string;
  public_id: string;
  created_at: string;
  secure_url: string;
  asset_folder: string;
}) => {
  let category: ImageCategory | null = null;

  if (dto.asset_folder) {
    category = await prisma.imageCategory.findFirst({
      where: { name: dto.asset_folder },
    });
  }

  return prisma.image.create({
    data: {
      externalAssetId: dto.asset_id,
      externalPublicId: dto.public_id,
      createdAt: dto.created_at,
      url: dto.secure_url,
      categoryId: category?.id,
    },
  });
};
