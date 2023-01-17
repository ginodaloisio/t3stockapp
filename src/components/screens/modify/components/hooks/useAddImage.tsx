import { trpc } from "../../../../../utils/trpc";
import { ImagesTypeForm } from "../ImagesForm";

export const useAddImage = ({ refreshImages }: { refreshImages: Function }) => {
  const addImageMutation = trpc.useMutation("image.addImage", {
    onSuccess: () => {
      refreshImages();
    },
  });
  const isImageLoading = addImageMutation.isLoading;
  const showImageError = addImageMutation.isError;
  const handleAddImageComplete = async (addImageData: ImagesTypeForm) => {
    await addImageMutation.mutateAsync({
      ...addImageData,
    });
  };

  return {
    isImageLoading,
    showImageError,
    handleAddImageComplete,
  };
};
