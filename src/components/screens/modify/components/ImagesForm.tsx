import { useForm } from "react-hook-form";
import { Button, Variant } from "../../../common/Button/Button";

export type ImagesTypeForm = {
  url: string;
  authorId: string;
  postId: string;
};

export const ImageForm = ({
  onComplete,
  isLoading,
  showError,
  authorId,
  postId,
}: {
  showError: boolean;
  isLoading: boolean;
  onComplete: (formData: ImagesTypeForm) => void;
  authorId: string;
  postId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImagesTypeForm>({
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
          <label
            htmlFor="url"
            className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
          >
            Agregar imagen
          </label>
          <input
            type="string"
            id="url"
            placeholder="ej: https://i.imgur.com/BlIgFZt.jpeg"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
            {...register("url", {
              required: true,
            })}
          />
          {errors.url && (
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
