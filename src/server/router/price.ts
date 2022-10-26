import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const priceRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  })
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
