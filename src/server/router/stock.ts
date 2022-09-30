import { createRouter } from "./context";
import { z } from "zod";

export const stockRouter = createRouter().query("getItems", {
  async resolve({ ctx }) {
    return await ctx.prisma.post.findMany();
  },
});
