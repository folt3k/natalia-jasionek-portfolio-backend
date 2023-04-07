import prisma from "../../prisma/client";

export const getImageCategories = async (): Promise<
  Array<{ name: string }>
> => {
  const categoriesWithCount = await prisma.imageCategory.findMany({
    include: {
      _count: {
        select: {
          images: true,
        },
      },
    },
  });

  return categoriesWithCount
    .filter((cat) => cat._count.images > 0)
    .map((cat) => ({ name: cat.name }));
};
