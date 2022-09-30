// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { stockRouter } from "./stock";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("stock.", stockRouter);
// .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
