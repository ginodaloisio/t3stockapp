import React from "react";
import { Post } from "../../../../prisma/prismaTypes";
import { Button } from "../../common/Button/Button";
import { tabAtom, TabName, TopNavigation } from "./components/TopNavigation";
import { useAtom } from "jotai";
import ItemScreen from "../item/ItemScreen";
import SaleForm from "./components/SaleForm";
import { useSaleItem } from "./hooks/useSaleItem";
function SaleScreen({
  item,
  lastReceiptId,
}: {
  item: Post;
  lastReceiptId: string;
}) {
  const [selectedTab] = useAtom(tabAtom);
  const { isLoading, isError, handleSaleItemComplete } = useSaleItem(
    item.prices[0]?.price
  );
  return (
    <>
      <TopNavigation />
      {selectedTab === TabName.Articulo && (
        <ItemScreen showButtons={false} item={item} />
      )}
      {selectedTab === TabName.Vender && (
        <SaleForm
          isLoading={isLoading}
          showError={isError}
          onComplete={handleSaleItemComplete}
          itemId={item.id}
          itemPrice={item.prices[0]!.price}
          seller="ginodaloisio@icloud.com"
          lastReceiptId={lastReceiptId}
        />
      )}
    </>
  );
}

export default SaleScreen;
// sellItemData: SellForm
