// // src/utils/trpc.ts
// import type { AppRouter } from "../server/router";
// import { createReactQueryHooks } from "@trpc/react";
// import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";

// export const trpc = createReactQueryHooks<AppRouter>();

// /**
//  * These are helper types to infer the input and output of query resolvers
//  * @example type HelloOutput = inferQueryOutput<'hello'>
//  */
// export type inferQueryOutput<
//   TRouteKey extends keyof AppRouter["_def"]["queries"],
// > = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

// export type inferQueryInput<
//   TRouteKey extends keyof AppRouter["_def"]["queries"],
// > = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

// export type inferMutationOutput<
//   TRouteKey extends keyof AppRouter["_def"]["mutations"],
// > = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

// export type inferMutationInput<
//   TRouteKey extends keyof AppRouter["_def"]["mutations"],
// > = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/router";
import superjson from "superjson";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
