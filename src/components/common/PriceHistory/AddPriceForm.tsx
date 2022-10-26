import { Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Button, ButtonVariant } from "../../common/Button/Button";

export type AddPriceForm = {
  price: number;
  authorId: string;
  postId: string;
};

export const AddPriceForm = ({
  onComplete,
  isLoading,
  showError,
  authorId,
  postId,
}: {
  showError: boolean;
  isLoading: boolean;
  onComplete: (formData: AddPriceForm) => void;
  authorId: string;
  postId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPriceForm>({
    defaultValues: {
      authorId: authorId,
      postId: postId,
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
  });

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
          placeholder="Nuevo precio"
          {...register("price", {
            required: true,
            setValueAs: (v) => (v === "" ? null : parseInt(v)),
          })}
        />
        {errors.price && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Este campo es obligatorio!
            </span>
          </label>
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
