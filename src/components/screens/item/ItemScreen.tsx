import { Images, Post } from "@prisma/client";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";
import { Button, Variant } from "../../common/Button/Button";
import { Card } from "../../common/Card";

const ItemScreen = ({ post }: { post: Post & { images: Images[] } }) => {
  const router = useRouter();
  const imageURL = post?.images[0]?.url;
  const handleEditButton = () => {
    router.push(`/modify?id=${post.id}`);
  };
  const handleReturnButton = () => {
    router.push(`/`);
  };
  return (
    <>
      <Card
        title={post.title}
        body={post.content}
        imageUrl={imageURL ?? "https://i.imgur.com/TRWWZzp.jpeg"}
      >
        {capitalizeFirstLetter(post.brand.toLowerCase())}
        <br />
        {post.type}
        <br />
        {/* TODO: mostrar informacion de mejor manera */}
        Alto: {post.height} Largo: {post.length_} Ancho: {post.width}
        <div className="relative mt-16">
          <Button
            className="absolute bottom-0 right-24 border border-b-0 border-r-0 border-l-0 border-gray-300 dark:border-white/20"
            variant={Variant.Secondary}
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
