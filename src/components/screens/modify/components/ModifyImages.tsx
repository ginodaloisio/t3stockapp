import { Images } from "@prisma/client";
import Image from "next/image";
import { useAddImage } from "./hooks/useAddImage";
import { ImageForm } from "./ImagesForm";

const ModifyImages = ({
  images,
  refreshImages,
  authorId,
  postId,
}: {
  images: Images[];
  refreshImages: Function;
  authorId: string;
  postId: string;
}) => {
  const { isLoading, showError, handleAddImageComplete } = useAddImage({
    refreshImages,
  });
  return (
    <div className="max-w-sm cursor-default rounded sm:max-w-lg">
      <h2 className="mb-4 text-center text-2xl text-white">
        Imagenes del articulo
      </h2>

      {images.map((image) => (
        <Image
          src={`${image.url}`}
          alt={`${image.authorId}`}
          placeholder="blur"
          blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
          width={1920}
          height={1080}
        />
      ))}
      <ImageForm
        isLoading={isLoading}
        showError={showError}
        onComplete={handleAddImageComplete}
        authorId={authorId}
        postId={postId}
      />
    </div>
  );
};

export default ModifyImages;

{
  /* <div className="max-w-sm cursor-default rounded sm:max-w-lg">
<div className="flex items-center gap-8">
  <h3 className="text-2xl text-white">Precios del articulo</h3>
</div>
<div className="mb-8 overflow-x-auto">
  <Table
    headers={["Precio", "Fecha", "ID"]}
    rows={results.map((result) => [
      <>${result.price}</>,
      <>{moment(result.createdAt).format("ddd D, MMM YYYY, h:mma")}</>,
      <p className="">{result.id}</p>,
    ])}
  />
</div>
<AddPriceForm
  isLoading={isLoading}
  showError={showError}
  onComplete={handleAddPriceComplete}
  authorId={authorId}
  postId={postId}
  /> */
}
