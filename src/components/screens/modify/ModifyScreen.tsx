import { Post } from "@prisma/client";
import { useAtom } from "jotai";
import moment from "moment";
import "moment/locale/es";
import Image from "next/image";
import { useEditItem } from "./hooks/useEditItem";
import { ModifyForm } from "./ModifyForm";
import { tabAtom, TabName, TopNavigation } from "./ModifyTabs";

//FIXME: el select en smaller devices se ve mal
const ModifyScreen = ({ entity }: { entity: Post }) => {
  const [selectedTab] = useAtom(tabAtom);

  const { isLoading, showError, handleEditItemComplete } = useEditItem({
    itemId: entity.id,
  });

  return (
    <>
      <TopNavigation />
      {selectedTab === TabName.Contenido && (
        <ModifyForm
          isLoading={isLoading}
          showError={showError}
          onComplete={handleEditItemComplete}
          entity={entity}
        />
      )}
      {selectedTab === TabName.Imagenes && (
        <div className="mx-auto max-w-2xl px-16 pb-10">
          <Image
            src={`${entity.image}`}
            alt={`${entity.authorId}`}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
            width={1920}
            height={1080}
          />
        </div>
      )}
    </>
  );
};

export default ModifyScreen;
