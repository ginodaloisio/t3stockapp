import { trpc } from "../../../../../utils/trpc";
import { ImagesTypeForm } from "../ImagesForm";

export const useAddImage = ({ refreshImages }: { refreshImages: Function }) => {
  const addImageMutation = trpc.useMutation("image.addImage", {
    onSuccess: () => {
      refreshImages();
    },
  });
  const isLoading = addImageMutation.isLoading;
  const showError = addImageMutation.isError;
  const handleAddImageComplete = async (addImageData: ImagesTypeForm) => {
    await addImageMutation.mutateAsync({
      ...addImageData,
    });
  };

  return {
    isLoading,
    showError,
    handleAddImageComplete,
  };
};
