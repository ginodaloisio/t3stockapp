// import { createProtectedRouter } from "./context";
import { z } from "zod";
import { Brands } from "../../../prisma/prismaTypes";
import { procedure, router } from "./context";
import { isAuthorized } from "./user";

export const stockRouter = router({
  getItems: procedure
    .use(isAuthorized)
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const stockItems = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          images: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          prices: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (stockItems.length > limit) {
        const nextItem = stockItems.pop();
        nextCursor = nextItem?.id;
      }
      return {
        stockItems,
        nextCursor,
      };
    }),
  getItem: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          images: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          prices: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
    }),
  searchItems: procedure
    .use(isAuthorized)
    .input(
      z.object({
        searchString: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.post.findMany({
        where: {
          OR: [
            {
              title: { contains: input.searchString, mode: "insensitive" },
            },
            {
              content: { contains: input.searchString, mode: "insensitive" },
            },
            {
              type: { contains: input.searchString, mode: "insensitive" },
            },
          ],
          AND: [
            {
              published: true,
            },
          ],
        },
        include: {
          images: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          prices: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
    }),
  addItem: procedure
    .use(isAuthorized)
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        price: z.number(),
        type: z.string().nullish(),
        brand: z.nativeEnum(Brands),
        height: z.number().nullish(),
        length_: z.number().nullish(),
        width: z.number().nullish(),
        imageURL: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          type: input?.type,
          brand: input.brand,
          height: input?.height,
          length_: input?.length_,
          width: input?.width,
          prices: {
            create: {
              price: input.price,
              authorId: input.authorId,
            },
          },
          author: { connect: { id: input.authorId } },
          images: {
            create: [
              {
                url: input.imageURL,
                authorId: input.authorId,
              },
            ],
          },
        },
      });
    }),
  editItem: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        type: z.string().nullable(),
        brand: z.nativeEnum(Brands),
        height: z.number().nullable(),
        length_: z.number().nullable(),
        width: z.number().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedItem = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          type: input.type,
          brand: input.brand,
          height: input.height,
          length_: input.length_,
          width: input.width,
        },
      });
      return updatedItem.id;
    }),
});
