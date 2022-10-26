import { Prices } from "@prisma/client";
import moment from "moment";
import Pagination from "../Pagination/Pagination";
import { Table } from "../Table/Table";
import { AddPriceForm } from "./AddPriceForm";
import { useAddPrice } from "./hooks/useAddPrice";

//TODO: al clickear la tabla se abra un modal que muestre informacion de quien cambio el precio y porque
export const PriceHistoryScreen = ({
  results,
  authorId,
  postId,
}: {
  results: Prices[];
  authorId: string;
  postId: string;
}) => {
  const { isLoading, showError, handleAddPriceComplete } = useAddPrice();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h3 className="text-2xl text-white">Precios del articulo</h3>
      </div>
      <div className="overflow-x-auto">
        <Table
          headers={["Precio", "Fecha", "ID"]}
          rows={results.map((result) => [
            <>${result.price}</>,
            <>{moment(result.createdAt).format("ddd D, MMM YYYY, h:mma")}</>,
            <>{result.id}</>,
          ])}
        />
      </div>
      <AddPriceForm
        isLoading={isLoading}
        showError={showError}
        onComplete={handleAddPriceComplete}
        authorId={authorId}
        postId={postId}
      />
      {/* <Pagination totalItems={123} /> */}
    </div>
  );
};