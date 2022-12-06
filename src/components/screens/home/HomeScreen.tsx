import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import ItemRender from "../../common/Items/Results";
import { EmptyStateHomeScreen } from "./EmptyStateHomeScreen";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContentLayout } from "../../common/Layouts/ContentLayout";
import { ThreeDots } from "react-loader-spinner";
import React from "react";
export const HomeScreen = () => {
  // const stockItemsQuery = trpc.useQuery(["stock.getItems", { cursor: "1" }]);
  const stockItemsInfiniteQuery = trpc.useInfiniteQuery(
    ["stock.getItems", { limit: 6 }],
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const {
    data: results,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = stockItemsInfiniteQuery;
  return (
    <EmptyStateWrapper
      isLoading={isLoading}
      data={results}
      EmptyComponent={<EmptyStateHomeScreen />}
      NonEmptyComponent={
        <InfiniteScroll
          dataLength={results?.pages.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <ContentLayout useContainer={true} useHeader={false}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#6466f1"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </ContentLayout>
          }
        >
          {results?.pages.map((i) => (
            <React.Fragment key={i.nextCursor ?? "lastPage"}>
              <ItemRender results={i.posts ?? []} />
            </React.Fragment>
          ))}
        </InfiniteScroll>
      }
    />
  );
};
