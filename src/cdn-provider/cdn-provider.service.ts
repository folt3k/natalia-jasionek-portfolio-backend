import prisma from "../../prisma/client";
import { ImageCategory } from "@prisma/client";

export const onCreateFolderNotification = (dto: { folder_name: string }) => {
  return prisma.imageCategory.create({
    data: {
      name: dto.folder_name,
    },
  });
};

export const onMoveImagesToFolder = async (dto: {
  resources: {
    [key: string]: {
      asset_id: string;
      to_asset_folder: string;
    };
  };
}) => {
  const categories = await prisma.imageCategory.findMany();

  await Promise.all(
    Object.values(dto.resources).map((item) =>
      prisma.image.update({
        where: {
          externalAssetId: item.asset_id,
        },
        data: {
          categoryId: categories.find(
            (cat) => cat.name === item.to_asset_folder
          )?.id,
        },
      })
    )
  );
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
