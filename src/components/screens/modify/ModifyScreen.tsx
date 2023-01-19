import { Post } from "@prisma/client";
import { useAtom } from "jotai";
import "moment/locale/es";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { EmptyStatePriceHistory } from "../../common/PriceHistory/EmptyStatePriceHistory";
import { PriceHistoryScreen } from "../../common/PriceHistory/PriceHistoryScreen";
import ModifyImages from "./components/ModifyImages";
import { useEditItem } from "./hooks/useEditItem";
import { ModifyForm } from "./components/ModifyForm";
import { tabAtom, TabName, TopNavigation } from "./components/ModifyTabs";
import { EmptyStateModifyImages } from "./components/EmptyStateModifyImages";

const ModifyScreen = ({
  entity,
  authorId,
}: {
  entity: Post;
  authorId: string;
}) => {
  const [selectedTab] = useAtom(tabAtom);
  const pricesQuery = trpc.price.getPrices.useQuery({
    id: entity.id,
  });
  const postImagesQuery = trpc.image.getImages.useQuery({
    id: entity.id,
  });
  const isLoadingPrices = pricesQuery.isLoading;
  const isLoadingImages = postImagesQuery.isLoading;
  const imagesData = postImagesQuery.data;
  const pricesData = pricesQuery.data;
  const postId = entity.id;
  const { isLoading, showError, handleEditItemComplete } = useEditItem({
    id: entity.id,
  });
  return (
    <>
      <TopNavigation />
      {selectedTab === TabName.Contenido && (
        <ModifyForm
          isLoading={isLoading}
          showError={showError}
          onComplete={handleEditItemComplete}
          entity={entity}
        />
      )}
      {selectedTab === TabName.Imagenes && (
        <EmptyStateWrapper
          isLoading={isLoadingImages}
          data={imagesData}
          EmptyComponent={
            <EmptyStateModifyImages
              refreshImages={postImagesQuery.refetch}
              authorId={authorId}
              postId={postId}
            />
          }
          NonEmptyComponent={
            <ModifyImages
              images={imagesData ?? []}
              authorId={authorId}
              postId={postId}
              refreshImages={postImagesQuery.refetch}
            />
          }
        />
      )}
      {selectedTab === TabName.Precio && (
        <EmptyStateWrapper
          isLoading={isLoadingPrices}
          data={pricesData}
          EmptyComponent={
            <EmptyStatePriceHistory
              refreshPrices={pricesQuery.refetch}
              authorId={authorId}
              postId={postId}
            />
          }
          NonEmptyComponent={
            <PriceHistoryScreen
              results={pricesData ?? []}
              authorId={authorId}
              postId={postId}
              refreshPrices={pricesQuery.refetch}
            />
          }
        />
      )}
    </>
  );
};

export default ModifyScreen;
