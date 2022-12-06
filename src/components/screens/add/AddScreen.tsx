import { useAddItem } from "./hooks/useAddItem";
import { AddForm } from "./AddForm";

//FIXME: el select en smaller devices se ve mal
const AddScreen = ({ authorId }: { authorId: string }) => {
  const { isLoading, showError, handleAddItemComplete } = useAddItem();
  return (
    <AddForm
      showError={showError}
      isLoading={isLoading}
      onComplete={handleAddItemComplete}
      authorId={authorId}
    />
  );
};

export default AddScreen;
