import { z } from "zod";
import { createProtectedRouter } from "./context";

export const priceRouter = createProtectedRouter()
  .query("getPrices", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.prices.findMany({
        where: { postId: input.id },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .query("getPrice", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.prices.findMany({
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
  .mutation("addPrice", {
    input: z.object({
      price: z.number(),
      authorId: z.string(),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const price = await ctx.prisma.prices.create({
        data: {
          price: input.price,
          authorId: input.authorId,
          postId: input.postId,
        },
      });
      return price.id;
    },
  });
