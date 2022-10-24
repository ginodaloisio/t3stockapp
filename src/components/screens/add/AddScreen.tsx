import { useAddItem } from "./hooks/useAddItem";
import { AddForm } from "./AddForm";

//FIXME: el select en smaller devices se ve mal
const AddScreen = ({ authorEmail }: { authorEmail: string }) => {
  const { isLoading, showError, handleAddItemComplete } = useAddItem();
  return (
    <AddForm
      showError={showError}
      isLoading={isLoading}
      onComplete={handleAddItemComplete}
      authorEmail={authorEmail}
    />
  );
};

export default AddScreen;
