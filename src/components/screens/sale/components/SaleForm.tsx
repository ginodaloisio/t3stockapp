import { uniqueId } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { router } from "../../../../server/router/context";
import { Button, Variant } from "../../../common/Button/Button";

export type SaleForm = {
  receiptId?: string;
  seller: string;
  buyer: string;
  amount: number;
  price: number;
  itemId: string;
};

function SaleForm({
  isLoading,
  showError,
  onComplete,
  itemPrice,
  seller,
  itemId,
  lastReceiptId,
}: {
  isLoading: boolean;
  showError: boolean;
  onComplete: (formData: SaleForm) => void;
  itemPrice: number;
  seller: string;
  itemId: string;
  lastReceiptId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaleForm>({
    defaultValues: {
      price: itemPrice,
      seller: seller,
      amount: 1,
      itemId: itemId,
    },
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
  });
  const handleReturnButton = () => {
    router.push("/");
  };
  return (
    <>
      <form className="flex w-2/3 flex-col sm:w-1/3" onSubmit={onSubmit}>
        {showError ? (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Ocurrio un error
            </span>
          </label>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="receiptId"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Numero de factura (ultimo numero de factura #{lastReceiptId})
          </label>
          {/* TODO: agregar un boton para obtener el ultimo numero de factura o simplemente un numero nuevo.. pensar la logica */}
          <input
            id="receiptId"
            type="text"
            placeholder="0"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("receiptId", { required: false })}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="seller"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Vendedor
          </label>
          <input
            type="text"
            id="seller"
            placeholder={seller}
            disabled
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("seller", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="buyer"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Comprador
          </label>
          <textarea
            id="buyer"
            placeholder="Informacion del comprador (nombre completo, numero de telefono, dni, etc)"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("buyer", { required: true })}
          />
          {errors.buyer ? (
            <label className="label">
              <span className="label-text-alt text-sm text-red-500">
                Este campo es obligatorio!
              </span>
            </label>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Cantidad
          </label>
          <input
            type="number"
            id="amount"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            placeholder="ej: 3"
            {...register("amount", {
              required: true,
              setValueAs: (v) => (v === "" ? null : parseInt(v)),
            })}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="price"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Precio
          </label>
          <input
            type="number"
            id="price"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            placeholder="ej: 40000"
            {...register("price", {
              required: true,
              setValueAs: (v) => (v === "" ? null : parseInt(v)),
            })}
          />
        </div>
        <Button
          className="mt-6"
          variant={Variant.Primary}
          isLoading={isLoading}
          type="submit"
        >
          Vender
        </Button>
        <Button
          className="mt-2"
          type="button"
          variant={Variant.Secondary}
          onClick={handleReturnButton}
        >
          Cancelar
        </Button>
      </form>
    </>
  );
}

export default SaleForm;
