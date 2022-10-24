import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";
import { Button, ButtonVariant } from "../../common/Button/Button";
import { Card } from "../../common/Card";

const ItemScreen = ({ post }: { post: Post }) => {
  const router = useRouter();
  const handleEditButton = () => {
    router.push(`/modify?id=${post.id}`);
  };
  const handleReturnButton = () => {
    router.push(`/`);
  };
  return (
    <>
      <Card title={post.title} body={post.content} imageUrl={post.image}>
        {capitalizeFirstLetter(post.brand.toLowerCase())}
        <br />
        {post.type}
        <br />
        {/* TODO: mostrar informacion de mejor manera */}
        Alto: {post.height} Largo: {post.length_} Ancho: {post.width}
        <div className="relative mt-16">
          <Button
            className="absolute bottom-0 right-24 border border-b-0 border-r-0 border-l-0 border-gray-300 dark:border-white/20"
            variant={ButtonVariant.Secondary}
            onClick={handleReturnButton}
          >
            Volver
          </Button>
          <Button
            className="absolute bottom-0 right-0 border border-b-0 border-r-0 border-l-0 border-gray-300 dark:border-white/20"
            onClick={handleEditButton}
          >
            Editar
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ItemScreen;
