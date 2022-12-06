import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Brands } from "../../../prisma/prismaEnums";

export const stockRouter = createRouter()
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
  .query("getItems", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }
      return {
        posts,
        nextCursor,
      };
    },
  })
  .query("getItem", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const result = await ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
        // include: {
        //   prices: {
        //     orderBy: {
        //       createdAt: "desc",
        //     },
        //     take: 1,
        //   },
        // },
      });
      return result;
    },
  })
  .query("searchItems", {
    input: z.object({
      searchString: z.string(),
    }),
    async resolve({ input, ctx }) {
      const results = await ctx.prisma.post.findMany({
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
      });
      return results;
    },
  })
  .mutation("addItem", {
    input: z.object({
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
    }),
    async resolve({ input, ctx }) {
      const item = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          type: input?.type,
          brand: input.brand,
          height: input?.height,
          length_: input?.length_,
          width: input?.width,
          image: input.imageURL,
          prices: {
            create: {
              price: input.price,
              authorId: input.authorId,
            },
          },
          author: { connect: { id: input.authorId } },
        },
      });
      return item.id;
    },
  })
  .mutation("editItem", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      type: z.string().nullish(),
      brand: z.nativeEnum(Brands),
      height: z.number().nullish(),
      length_: z.number().nullish(),
      width: z.number().nullish(),
      image: z.string(),
    }),
    async resolve({ input, ctx }) {
      const updatedItem = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          type: input.type != null ? input.type : undefined,
          brand: input.brand,
          height: input.height != null ? input.height : undefined,
          length_: input.length_ != null ? input.length_ : undefined,
          width: input.width != null ? input.width : undefined,
          image: input.image,
        },
      });
      return updatedItem.id;
    },
  });
