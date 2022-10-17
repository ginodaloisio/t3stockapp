import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { Brands, Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import { Button, ButtonVariant } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";

type UpdateForm = {
  title: string;
  content: string;
  type: string | null;
  brand: Brands;
  height: number | null;
  length_: number | null;
  width: number | null;
  imageURL: string;
  authorEmail: string;
};
//TODO: encontrar una forma de mostrar el contenido actual y habilitar al usuario para editarlo, agregar el mutation update a trpc, terminar el componente en general, agregar el modal global.
//FIXME: el select en smaller devices se ve mal
const updateScreen = ({ entity }: { entity: Post }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateForm>({
    defaultValues: {
      title: entity.title,
      content: entity.content,
      type: entity.type,
      brand: entity.brand,
      height: entity.height,
      length_: entity.length_,
      width: entity.width,
      imageURL: entity.image,
    },
  });
  moment.locale("es");
  const [infoModal, setinfoModal] = useState(true);
  const [pricemodalOpen, setpricemodalOpen] = useState(false);

  const updateItemMutation = trpc.useMutation("stock.addItem");

  const isLoading = updateItemMutation.isLoading;
  const showError = updateItemMutation.isError;

  const onSubmit = async (data: UpdateForm) => {};

  const togglemodalInfo = () => {
    setinfoModal(!infoModal);
  };
  const togglemodalPrice = () => {
    setpricemodalOpen(!pricemodalOpen);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {showError && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Ocurrio un error
            </span>
          </label>
        )}
        <Input
          className="w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={entity.title}
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
          {...register("imageURL", { required: true })}
          placeholder="URL Imagen"
          type="text"
          className="mt-6 w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
        {errors.imageURL && (
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
          Agregar
        </Button>
      </form>
    </>
  );
};

export default updateScreen;
