import { z } from "zod";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter().query("getUser", {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
  },
});
