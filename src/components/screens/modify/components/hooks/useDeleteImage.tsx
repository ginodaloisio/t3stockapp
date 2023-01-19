import { trpc } from "../../../../../utils/trpc";

export const useDeleteImage = ({
  refreshImages,
}: {
  refreshImages: Function;
}) => {
  const deleteImageMutation = trpc.image.deleteImage.useMutation({
    onSuccess: () => {
      refreshImages();
    },
  });
  const showDeleteError = deleteImageMutation.isError;
  const isDeleteLoading = deleteImageMutation.isLoading;
  const handleDeleteImageClick = async (id: string) => {
    await deleteImageMutation.mutateAsync({
      id: id,
    });
  };

  return {
    isDeleteLoading,
    showDeleteError,
    handleDeleteImageClick,
  };
};
