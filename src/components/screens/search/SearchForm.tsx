import { Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Button, ButtonVariant } from "../../common/Button/Button";

export type SearchForm = {
  searchString: string;
};

export const SearchForm = ({
  onComplete,
  isLoading,
  showError,
}: {
  onComplete: (formData: SearchForm) => void;
  isLoading: boolean;
  showError: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();
  const onSubmit = handleSubmit(async (data) => {
    onComplete(data);
  });
  return (
    <form className="flex w-2/3 flex-col gap-4 sm:w-1/3" onSubmit={onSubmit}>
      {showError && (
        <label className="label">
          <span className="label-text-alt text-sm text-red-500">
            Ocurrio un error
          </span>
        </label>
      )}
      <Input
        className="w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Buscar"
        {...register("searchString", { required: true })}
      />
      {errors.searchString && (
        <label className="label">
          <span className="label-text-alt text-sm text-red-500">
            Este campo es obligatorio!
          </span>
        </label>
      )}
      <Button
        type="submit"
        variant={ButtonVariant.Primary}
        isLoading={isLoading}
      >
        Buscar
      </Button>
    </form>
  );
};
