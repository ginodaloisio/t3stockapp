import React from "react";
import { Brands, Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button, ButtonVariant } from "../../common/Button/Button";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";
import { Input } from "react-daisyui";
import { useRouter } from "next/router";

type UpdateForm = {
  title: string;
  content: string;
  type: string | null;
  brand: Brands;
  height: number | null;
  length_: number | null;
  width: number | null;
  image: string;
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
      <form
        className="form-control flex w-2/3 flex-col sm:w-1/3"
        onSubmit={onSubmit}
      >
        {showError && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Ocurrio un error
            </span>
          </label>
        )}
        <Input
          className="w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Titulo"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Este campo es obligatorio!
            </span>
          </label>
        )}
        <Input
          className="mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Descripcion"
          {...register("content", { required: true })}
        />
        {errors.content && (
          <span className="text-sm text-red-500">
            Este campo es obligatorio!
          </span>
        )}
        <Input
          className="mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Tipo"
          {...register("type", {
            required: false,
            setValueAs: (v) => (v === "" ? null : v),
          })}
        />
        {errors.type && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Este campo es obligatorio!
            </span>
          </label>
        )}
        <select
          className="mt-6 block w-full rounded-lg border border-gray-300 bg-gray-200 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
        <div className="flex gap-3">
          <Input
            placeholder="Largo"
            className="dark:focus:ring-blue-500mt mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            {...register("length_", {
              required: false,
              setValueAs: (v) => (v === "" ? null : parseInt(v)),
            })}
            type="number"
          />
          <Input
            placeholder="Ancho"
            className="dark:focus:ring-blue-500mt mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            {...register("width", {
              required: false,
              setValueAs: (v) => (v === "" ? null : parseInt(v)),
            })}
            type="number"
          />
          <Input
            placeholder="Alto"
            className="dark:focus:ring-blue-500mt mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            {...register("height", {
              required: false,
              setValueAs: (v) => (v === "" ? null : parseInt(v)),
            })}
            type="number"
          />
        </div>
        <Input
          {...register("image", { required: true })}
          placeholder="URL Imagen"
          type="text"
          className="mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
        {errors.image && (
          <span className="text-sm text-red-500">
            Este campo es obligatorio!
          </span>
        )}
        <Button
          className="mt-6"
          type="submit"
          variant={ButtonVariant.Primary}
          isLoading={isLoading}
        >
          Modificar
        </Button>
        <Button
          className="mt-2"
          type="button"
          variant={ButtonVariant.Secondary}
          onClick={handleReturnButton}
        >
          Cancelar
        </Button>
      </form>
    </>
  );
};
