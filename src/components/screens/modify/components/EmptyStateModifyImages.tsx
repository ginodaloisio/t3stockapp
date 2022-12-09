import { useAddImage } from "./hooks/useAddImage";
import { ImageForm } from "./ImagesForm";

export const EmptyStateModifyImages = ({
  authorId,
  refreshImages,
  postId,
}: {
  authorId: string;
  postId: string;
  refreshImages: Function;
}) => {
  const { isLoading, showError, handleAddImageComplete } = useAddImage({
    refreshImages,
  });
  return (
    <div className="mx-auto items-center justify-center gap-8">
      <span className="text-2xl">Este articulo no tiene imagenes todavia!</span>
      <div className="mt-8">
        <ImageForm
          isLoading={isLoading}
          showError={showError}
          onComplete={handleAddImageComplete}
          authorId={authorId}
          postId={postId}
        />
      </div>
    </div>
  );
};
