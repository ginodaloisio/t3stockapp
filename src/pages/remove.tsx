import { isEmpty } from "lodash";
import React, { useState } from "react";
import ItemRender from "../components/common/Items/Results";
import { ContentLayout } from "../components/common/Layouts/ContentLayout";
import { useSearchItem } from "../components/screens/search/hooks/useSearchItem";
import { SearchForm } from "../components/screens/search/SearchForm";

function RemovePage() {
  const [searchParams, setSearchParams] = useState<SearchForm>({
    searchString: "",
  });
  const { isLoading, isSuccess, showError, results } = useSearchItem({
    searchParams: searchParams,
  });
  const isResponseEmpty = isSuccess && isEmpty(results);
  return (
    <>
      <ContentLayout>
        <SearchForm
          isLoading={isLoading}
          isResponseEmpty={isResponseEmpty}
          onComplete={setSearchParams}
          showError={showError}
        />
      </ContentLayout>
      {results ? <ItemRender results={results} /> : null}
    </>
  );
}

export default RemovePage;
