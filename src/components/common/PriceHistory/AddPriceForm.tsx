import { useForm } from "react-hook-form";
import { Button, Variant } from "../../common/Button/Button";

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
      <form onSubmit={onSubmit}>
        {showError && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Ocurrio un error
            </span>
          </label>
        )}
        <div>
          <input
            type="number"
            id="price"
            placeholder="ej: 45000"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
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
        </div>
        <Button
          className="mt-6"
          type="submit"
          variant={Variant.Primary}
          isLoading={isLoading}
        >
          Agregar
        </Button>
      </form>
    </>
  );
};
