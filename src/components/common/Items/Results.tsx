// import { Post } from "../../../../prisma/prismaTypes";
// function ItemRender({ results }: { results: Post[] }) {

import { Images, Post } from "@prisma/client";
import Items from "./components/Items";

function ItemRender({ results }: { results: (Post & { images: Images[] })[] }) {
  console.log(results);
  return (
    <div className="3xl:flex my-10 flex-wrap justify-center px-5 sm:grid md:grid-cols-2 xl:grid-cols-3">
      {results.map((result) => (
        <Items key={result.id} result={result} />
      ))}
    </div>
  );
}

export default ItemRender;
