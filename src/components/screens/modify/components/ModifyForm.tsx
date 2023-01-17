import React from "react";
import { Brands, Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button, Variant } from "../../../common/Button/Button";
import { capitalizeFirstLetter } from "../../../../utils/useCapitalizeFirstLetter";
import { useRouter } from "next/router";

export type UpdateForm = {
  title: string;
  content: string;
  type: string | null;
  brand: Brands;
  height: number | null;
  length_: number | null;
  width: number | null;
  authorEmail: string;
};

export const ModifyForm = ({
  onComplete,
  isLoading,
  showError,
  entity,
}: {
  showError: boolean;
  isLoading: boolean;
  onComplete: (formData: UpdateForm) => void;
  entity: Post;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateForm>({
    defaultValues: entity,
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
  });
  const handleReturnButton = () => {
    router.push(`/item/${entity.id}`);
  };

  return (
    <>
      <form className="flex w-2/3 flex-col sm:w-1/3" onSubmit={onSubmit}>
        {showError && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Ocurrio un error
            </span>
          </label>
        )}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Nombre del articulo
          </label>
          <input
            type="text"
            id="title"
            placeholder="ej: Colchon cannon"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-sm text-red-500">
                Este campo es obligatorio!
              </span>
            </label>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Descripcion del articulo
          </label>
          <input
            type="text"
            id="content"
            placeholder="ej: Base blanca con..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <label className="label">
              <span className="label-text-alt text-sm text-red-500">
                Este campo es obligatorio!
              </span>
            </label>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="brand"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Marca del articulo
          </label>
          <select
            id="brand"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("brand", { required: true })}
          >
            {Object.entries(Brands).map(([key, title]) => {
              return (
                <option key={key} value={title}>
                  {capitalizeFirstLetter(title.toLowerCase())}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-5 flex gap-3">
          <div>
            <label
              htmlFor="length_"
              className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
            >
              Largo
            </label>
            <input
              type="number"
              id="length_"
              placeholder="ej: 190cm"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
              {...register("length_", {
                required: false,
                setValueAs: (v) => (v === "" ? null : parseInt(v)),
              })}
            />
          </div>
          <div>
            <label
              htmlFor="width"
              className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
            >
              Ancho
            </label>
            <input
              type="number"
              id="width"
              placeholder="ej: 60cm"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
              {...register("width", {
                required: false,
                setValueAs: (v) => (v === "" ? null : parseInt(v)),
              })}
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
            >
              Alto
            </label>
            <input
              type="number"
              id="height"
              placeholder="ej: 20cm"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
              {...register("height", {
                required: false,
                setValueAs: (v) => (v === "" ? null : parseInt(v)),
              })}
            />
          </div>
        </div>
        <Button
          className="mt-6"
          type="submit"
          variant={Variant.Primary}
          isLoading={isLoading}
        >
          Modificar
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
};
