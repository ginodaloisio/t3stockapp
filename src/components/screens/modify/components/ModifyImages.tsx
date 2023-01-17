import { Images } from "@prisma/client";
import Image from "next/image";
import { trpc } from "../../../../utils/trpc";
import { Button, Variant } from "../../../common/Button/Button";
import { useAddImage } from "./hooks/useAddImage";
import { useDeleteImage } from "./hooks/useDeleteImage";
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
  const { isImageLoading, showImageError, handleAddImageComplete } =
    useAddImage({
      refreshImages,
    });
  //TODO:,FIXME: isDeleteLoading shows all buttons loading after you delete n image, it should only display loading to the button clicked
  const { isDeleteLoading, showDeleteError, handleDeleteImageClick } =
    useDeleteImage({
      refreshImages,
    });

  return (
    <div className="max-w-sm cursor-default rounded sm:max-w-lg">
      <h2 className="mb-4 text-center text-2xl text-white">
        Imagenes del articulo
      </h2>

      {images.map((image) => (
        <>
          <Image
            src={`${image.url}`}
            alt={`${image.authorId}`}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
            width={1920}
            height={1080}
          />
          {showDeleteError && (
            <label key={image.id} className="label">
              <span className="label-text-alt text-sm text-red-500">
                Ocurrio un error al eliminar la imagen
              </span>
            </label>
          )}
          <Button
            key={image.id}
            className="mb-2"
            variant={Variant.Secondary}
            onClick={() => handleDeleteImageClick(image.id)}
          >
            Borrar imagen
          </Button>
        </>
      ))}
      <ImageForm
        isLoading={isImageLoading}
        showError={showImageError}
        onComplete={handleAddImageComplete}
        authorId={authorId}
        postId={postId}
      />
    </div>
  );
};

export default ModifyImages;
