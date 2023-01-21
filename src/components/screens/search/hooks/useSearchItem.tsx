import { Images, Post } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { SearchForm } from "../SearchForm";

export const useSearchItem = ({
  searchParams,
}: {
  searchParams: SearchForm;
}) => {
  const [results, setResults] = useState<
    (Post & { images: Images[] })[] | undefined
  >([]);
  const query = trpc.stock.searchItems.useQuery(
    {
      searchString: searchParams.searchString,
    },
    {
      enabled: !!searchParams.searchString,
      onSuccess(data) {
        setResults(data);
      },
    }
  );
  const isLoading = query.isLoading && query.fetchStatus !== "idle";
  const showError = query.isError;
  const isSuccess = query.isSuccess;
  return {
    isSuccess,
    isLoading,
    showError,
    results,
  };
};
