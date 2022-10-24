import { Post } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { SearchForm } from "../SearchForm";

export const useSearchItem = ({
  searchParams,
}: {
  searchParams: SearchForm;
}) => {
  const [results, setResults] = useState<Post[] | undefined>([]);
  const query = trpc.useQuery(
    ["stock.searchItems", { searchString: searchParams.searchString }],
    {
      enabled: !!searchParams.searchString,
      onSuccess(data) {
        setResults(data);
      },
    }
  );
  const isLoading = query.isLoading;
  const showError = query.isError;
  return {
    isLoading,
    showError,
    results,
  };
};