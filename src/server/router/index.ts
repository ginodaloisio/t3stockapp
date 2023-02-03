import { stockRouter } from "./stock";
import { priceRouter } from "./price";
import { userRouter } from "./user";
import { imageRouter } from "./images";
import { router } from "./context";
import { saleRouter } from "./sale";

export const appRouter = router({
  stock: stockRouter,
  price: priceRouter,
  user: userRouter,
  image: imageRouter,
  sale: saleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
