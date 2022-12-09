// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { stockRouter } from "./stock";
import { protectedExampleRouter } from "./protected-example-router";
import { priceRouter } from "./price";
import { userRouter } from "./user";
import { imageRouter } from "./images";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("stock.", stockRouter)
  .merge("price.", priceRouter)
  .merge("user.", userRouter)
  .merge("image.", imageRouter);
// .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
