import prisma from "../../prisma/client";

export const onCreateFolderNotification = (dto: { folder_name: string }) => {
  return prisma.imageCategory.create({
    data: {
      name: dto.folder_name,
    },
  });
};
