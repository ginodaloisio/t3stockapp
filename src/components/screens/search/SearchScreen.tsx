import { isEmpty } from "lodash";
import { useState } from "react";
import ItemRender from "../../common/Items/Results";
import { ContentLayout } from "../../common/Layouts/ContentLayout";
import { useSearchItem } from "./hooks/useSearchItem";
import { SearchForm } from "./SearchForm";

const SearchScreen = () => {
  const [searchParams, setSearchParams] = useState<SearchForm>({
    searchString: "",
  });
  const { isLoading, isSuccess, showError, results } = useSearchItem({
    searchParams: searchParams,
  });
  const isResponseEmpty = isSuccess && isEmpty(results);
  return (
    <>
      <ContentLayout useContainer={true}>
        <SearchForm
          onComplete={setSearchParams}
          isLoading={isLoading}
          showError={showError}
          isResponseEmpty={isResponseEmpty}
        />
      </ContentLayout>
      {results ? <ItemRender results={results} /> : null}
    </>
  );
};

export default SearchScreen;
