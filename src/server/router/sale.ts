import { z } from "zod";
import { procedure, router } from "./context";
import { isAuthorized } from "./user";

export const saleRouter = router({
  registerSale: procedure
    .use(isAuthorized)
    .input(
      z.object({
        receiptId: z.string().optional(),
        seller: z.string(),
        buyer: z.string(),
        amount: z.number(),
        itemId: z.string(),
        itemPrice: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.sales.create({
        data: {
          receiptId: input?.receiptId,
          authorEmail: input.seller,
          buyer: input.buyer,
          amount: input.amount,
          itemId: input.itemId,
          price: input.itemPrice,
        },
      });
    }),
  getSale: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.sales.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getLastSale: procedure.use(isAuthorized).query(async ({ ctx }) => {
    return await ctx.prisma.sales.findMany({
      select: {
        receiptId: true,
      },
      orderBy: {
        soldAt: "desc",
      },
      take: 1,
    });
  }),
  getSales: procedure
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
      const sales = await ctx.prisma.sales.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          item: {
            include: {
              images: {
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
          author: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (sales.length > limit) {
        const nextItem = sales.pop();
        nextCursor = nextItem?.id;
      }
      return {
        sales,
        nextCursor,
      };
    }),
});
