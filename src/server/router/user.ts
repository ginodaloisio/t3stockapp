import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { middleware, procedure, router } from "./context";

export const isAuthorized = middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const userRouter = router({
  getUser: procedure
    .use(isAuthorized)
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
