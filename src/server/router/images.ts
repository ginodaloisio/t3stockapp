import { z } from "zod";
import { createProtectedRouter } from "./context";

export const imageRouter = createProtectedRouter()
  .query("getImages", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.images.findMany({
        where: { postId: input.id },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .query("getImage", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.images.findMany({
        where: {
          postId: input.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
    },
  })
  .mutation("addImage", {
    input: z.object({
      url: z.string(),
      authorId: z.string(),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const image = await ctx.prisma.images.create({
        data: {
          url: input.url,
          authorId: input.authorId,
          postId: input.postId,
        },
      });
      return image.id;
    },
  });
