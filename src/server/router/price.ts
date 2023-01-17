import { z } from "zod";
import { procedure, router } from "./context";
import { isAuthorized } from "./user";

export const priceRouter = router({
  getPrices: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.prices.findMany({
        where: {
          postId: input.id,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getPrice: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.prices.findMany({
        where: {
          postId: input.id,
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  addPrice: procedure
    .use(isAuthorized)
    .input(
      z.object({
        price: z.number(),
        authorId: z.string(),
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newPrice = await ctx.prisma.prices.create({
        data: {
          price: input.price,
          authorId: input.authorId,
          postId: input.postId,
        },
      });
      return newPrice.id;
    }),
});
