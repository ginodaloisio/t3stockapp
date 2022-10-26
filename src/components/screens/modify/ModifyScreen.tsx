import { Post } from "@prisma/client";
import { useAtom } from "jotai";
import moment from "moment";
import "moment/locale/es";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { EmptyStatePriceHistory } from "../../common/PriceHistory/EmptyStatePriceHistory";
import { PriceHistory } from "../../common/PriceHistory/PriceHistory";
import { PriceHistoryScreen } from "../../common/PriceHistory/PriceHistoryScreen";
import { useEditItem } from "./hooks/useEditItem";
import { ModifyForm } from "./ModifyForm";
import { tabAtom, TabName, TopNavigation } from "./ModifyTabs";

//FIXME: el select en smaller devices se ve mal
const ModifyScreen = ({
  entity,
  authorId,
}: {
  entity: Post;
  authorId: string;
}) => {
  const [selectedTab] = useAtom(tabAtom);
  const pricesQuery = trpc.useQuery(["price.getPrices", { id: entity.id }]);
  const isLoadingPrices = pricesQuery.isLoading;
  const pricesData = pricesQuery.data;
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
        <div className="mx-auto max-w-2xl px-16 pb-10">
          <Image
            src={`${entity.image}`}
            alt={`${entity.authorId}`}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
            width={1920}
            height={1080}
          />
        </div>
      )}
      {selectedTab === TabName.Precio && (
        <EmptyStateWrapper
          isLoading={isLoadingPrices}
          data={pricesData}
          EmptyComponent={<EmptyStatePriceHistory />}
          NonEmptyComponent={
            <PriceHistoryScreen
              results={pricesData ?? []}
              authorId={authorId}
              postId={entity.id}
            />
          }
        />
      )}
    </>
  );
};

export default ModifyScreen;
