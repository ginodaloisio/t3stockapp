import type { Brands as PrismaBrands } from "@prisma/client";

//We need to map all prisma enums to objects so they can be safely imported into client side code
// Otherwise this will break the build by importing the WHOLE Prisma client on the client side
// see https://github.com/prisma/prisma/issues/12504

export const Brands: { [k in PrismaBrands]: k } = {
  GENERAL: "GENERAL",
  VALENZIANA: "VALENZIANA",
  FRANCOVALENTE: "FRANCOVALENTE",
  SIMMONS: "SIMMONS",
  CANNON: "CANNON",
} as const;

export type Brands = PrismaBrands;
