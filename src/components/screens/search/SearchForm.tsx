import { useForm } from "react-hook-form";
import { Button, Variant } from "../../common/Button/Button";

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
      <div>
        <label
          htmlFor="searchInput"
          className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
        >
          Nombre / descripcion del articulo
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder="ej: Colchon cannon"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
          {...register("searchString", { required: true })}
        />
        {errors.searchString && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              Este campo es obligatorio!
            </span>
          </label>
        )}
      </div>
      <Button type="submit" variant={Variant.Primary} isLoading={isLoading}>
        Buscar
      </Button>
    </form>
  );
};
