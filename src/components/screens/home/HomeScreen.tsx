import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import ItemRender from "../../common/Items/Results";
import { EmptyStateHomeScreen } from "./EmptyStateHomeScreen";

export const HomeScreen = () => {
  const stockItemsQuery = trpc.useQuery(["stock.getItems"]);
  const { data: results, isLoading } = stockItemsQuery;
  return (
    <EmptyStateWrapper
      isLoading={isLoading}
      data={results}
      EmptyComponent={<EmptyStateHomeScreen />}
      NonEmptyComponent={<ItemRender results={results ?? []} />}
    />
  );
};
