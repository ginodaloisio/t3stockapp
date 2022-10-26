import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../EmptyStateWrapper";
import { EmptyStatePriceHistory } from "./EmptyStatePriceHistory";
import { PriceHistoryScreen } from "./PriceHistoryScreen";

export const PriceHistory = ({ id }: { id: string }) => {
  const pricesQuery = trpc.useQuery(["price.getPrices", { id: id }]);
  const { data: results, isLoading } = pricesQuery;
  return (
    <EmptyStateWrapper
      isLoading={isLoading}
      data={results}
      EmptyComponent={<EmptyStatePriceHistory />}
      NonEmptyComponent={<PriceHistoryScreen results={results ?? []} />}
    />
  );
};
