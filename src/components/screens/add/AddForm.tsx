import { Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Brands } from "../../../../prisma/prismaEnums";
import { Button, ButtonVariant } from "../../common/Button/Button";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";

type AddForm = {
  title: string;
  content: string;
  type: string;
  brand: Brands;
  height: number;
  length_: number;
  width: number;
  imageURL: string;
  authorEmail: string;
};

export const AddForm = ({
  onComplete,
  isLoading,
  showError,
  authorEmail,
}: {
  showError: boolean;
  isLoading: boolean;
  onComplete: (formData: AddForm) => void;
  authorEmail: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddForm>({
    defaultValues: {
      height: undefined,
      length_: undefined,
      width: undefined,
      type: undefined,
      authorEmail: authorEmail,
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
  });
  return (
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
        <span className="text-sm text-red-500">Este campo es obligatorio!</span>
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
        <span className="text-sm text-red-500">Este campo es obligatorio!</span>
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
  );
};
