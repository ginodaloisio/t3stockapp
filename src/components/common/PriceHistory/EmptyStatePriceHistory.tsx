import { AddPriceForm } from "./AddPriceForm";
import { useAddPrice } from "./hooks/useAddPrice";

export const EmptyStatePriceHistory = ({
  authorId,
  refreshPrices,
  postId,
}: {
  authorId: string;
  postId: string;
  refreshPrices: Function;
}) => {
  const { isLoading, showError, handleAddPriceComplete } = useAddPrice({
    refreshPrices,
  });
  return (
    <div className="mx-auto items-center justify-center gap-8">
      <span className="text-2xl">Este articulo no tiene precio todavia!</span>
      <div className="mt-8">
        <AddPriceForm
          isLoading={isLoading}
          showError={showError}
          onComplete={handleAddPriceComplete}
          authorId={authorId}
          postId={postId}
        />
      </div>
    </div>
  );
};
