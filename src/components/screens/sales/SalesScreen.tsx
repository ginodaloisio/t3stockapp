import { useAtom } from "jotai";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { trpc } from "../../../utils/trpc";
import { EmptyStateWrapper } from "../../common/EmptyStateWrapper";
import { Table } from "../../common/Table/Table";
import { Avatar, AvatarFallback, AvatarImage } from "../../common/Ui/Avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../common/Ui/HoverCard";
import { tabAtom, TabName, TopNavigation } from "./components/TopNavigation";
import { EmptyStateSales } from "./EmptyStateSales";

function SalesScreen() {
  const salesInfiniteQuery = trpc.sale.getSales.useInfiniteQuery(
    {
      limit: 6,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const {
    data: data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = salesInfiniteQuery;
  console.log(data);
  const [selectedTab] = useAtom(tabAtom);
  moment.locale("es");

  return (
    <>
      <TopNavigation />
      {selectedTab === TabName.Charts && <h2>Charts</h2>}
      {selectedTab === TabName.Overview && (
        <EmptyStateWrapper
          isLoading={isLoading}
          data={data}
          EmptyComponent={<EmptyStateSales />}
          NonEmptyComponent={
            <InfiniteScroll
              dataLength={data?.pages.length ?? 0}
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#6466f1"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              }
            >
              <article className="max-w-sm sm:max-w-full">
                {data?.pages[0] && (
                  <Table
                    headers={[
                      "Vendedor",
                      "Comprador",
                      "Factura N",
                      "Item",
                      "Cantidad",
                      "Precio",
                    ]}
                    rows={data.pages[0].sales.map((sale) => [
                      <>
                        <HoverCard>
                          <HoverCardTrigger className="cursor-pointer underline decoration-sky-500 underline-offset-2">
                            {sale.author.name}
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div className="flex space-x-4">
                              <Avatar>
                                <AvatarImage src={sale.author.image ?? ""} />
                                <AvatarFallback>AV</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold">
                                  {sale.author.name}
                                </h4>
                                <p>{sale.author.email}</p>
                                <div className="flex items-center pt-2">
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {sale.author.id}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </>,
                      <>{sale.buyer}</>,
                      <>{sale.receiptId}</>,
                      <>
                        <HoverCard>
                          <HoverCardTrigger className="underline decoration-sky-500 underline-offset-2 hover:animate-pulse">
                            <Link href={`/item/${sale.item.id}`}>
                              {sale.item.title}
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div className="flex space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={sale.item.images[0]?.url ?? ""}
                                />
                                <AvatarFallback>IM</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold">
                                  {sale.item.title}
                                </h4>
                                <p className="max-w-[170px] truncate text-sm underline decoration-sky-500 underline-offset-2 hover:overflow-visible hover:overflow-ellipsis hover:whitespace-normal hover:no-underline">
                                  {sale.item.content}
                                </p>
                                <div className="flex items-center pt-2">
                                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Vendido el{" "}
                                    {moment(sale.soldAt).format("D MMM YYYY")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </>,
                      <>{sale.amount}</>,
                      <>{sale.price}</>,
                    ])}
                  />
                )}
              </article>
            </InfiniteScroll>
          }
        />
      )}
    </>
  );
}

export default SalesScreen;
