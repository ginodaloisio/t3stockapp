import { z } from "zod";
import { procedure, router } from "./context";
import { isAuthorized } from "./user";

export const imageRouter = router({
  getImages: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.images.findMany({
        where: { postId: input.id },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getImage: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.images.findMany({
        where: {
          postId: input.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
    }),
  addImage: procedure
    .use(isAuthorized)
    .input(
      z.object({
        url: z.string(),
        authorId: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const image = await ctx.prisma.images.create({
        data: {
          url: input.url,
          authorId: input.authorId,
          postId: input.postId,
        },
      });
      return image.id;
    }),
  deleteImage: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.images.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
