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

export const getImages = async (
  params: {
    page?: number | string;
    perPage?: number | string;
    category?: string;
  } = {}
): Promise<{
  page: number;
  perPage: number;
  total: number;
  items: Array<{ url: string }>;
}> => {
  const page = params.page ? +params.page : 1;
  const perPage = params.perPage ? +params.perPage : 10;

  const data  = await prisma.image.findMany({
    where: {
      ...(params.category
        ? {
            category: {
              name: params.category,
            },
          }
        : null),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const total = await prisma.image.count({
    where: {
      ...(params.category
        ? {
            category: {
              name: params.category,
            },
          }
        : null),
    },
  });

  return {
    page,
    perPage,
    total,
    items: data.map((item) => ({ url: item.url })),
  };
};
