import { useState } from "react";
import ItemRender from "../../common/Items/Results";
import { ContentLayout } from "../../common/Layouts/ContentLayout";
import { useSearchItem } from "./hooks/useSearchItem";
import { SearchForm } from "./SearchForm";

const SearchScreen = () => {
  const [searchParams, setSearchParams] = useState<SearchForm>({
    searchString: "",
  });
  const { isLoading, showError, results } = useSearchItem({
    searchParams: searchParams,
  });
  return (
    <>
      <ContentLayout useContainer={true}>
        <SearchForm
          onComplete={setSearchParams}
          isLoading={isLoading}
          showError={showError}
        />
      </ContentLayout>
      {results && <ItemRender results={results} />}
    </>
  );
};

export default SearchScreen;
