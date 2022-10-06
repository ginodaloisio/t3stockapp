import { Post } from "@prisma/client";
import { useState } from "react";
import { Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import { Button, ButtonVariant } from "../../common/Button/Button";
import ItemRender from "../../common/Items/Results";
import { ContentLayout } from "../../common/Layouts/ContentLayout";

type SearchForm = {
  searchString: string;
};

function SearchScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>();

  const [searchResults, setSearchResults] = useState<Post[] | undefined>([]);
  const [searchParams, setSearchParams] = useState<string>("");

  const query = trpc.useQuery(
    ["stock.searchItems", { searchString: searchParams }],
    {
      enabled: !!searchParams,
      onSuccess(data) {
        setSearchResults(data);
      },
    }
  );

  const isLoading = query.isLoading;
  const showError = query.isError;

  const onSubmit = async (data: SearchForm) => {
    const searchStringParsed = data.searchString;
    setSearchParams(searchStringParsed);
  };

  return (
    <>
      <ContentLayout useContainer={true}>
        <form
          className="flex w-2/3 flex-col gap-4 sm:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
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
      </ContentLayout>
      {searchResults && <ItemRender results={searchResults} />}
    </>
  );
}

export default SearchScreen;
