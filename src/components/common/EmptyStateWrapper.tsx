import React, { ReactNode } from "react";
import { ThreeDots } from "react-loader-spinner";
import { isEmpty } from "lodash";
import { ContentLayout } from "./Layouts/ContentLayout";

export const EmptyStateWrapper = ({
  isLoading,
  data,
  EmptyComponent,
  NonEmptyComponent,
}: {
  isLoading: boolean;
  data: any;
  EmptyComponent: ReactNode;
  NonEmptyComponent: ReactNode;
}) => {
  return (
    <div>
      {isLoading ? (
        <ContentLayout useContainer={true} useHeader={false}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#6466f1"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </ContentLayout>
      ) : isEmpty(data) ? (
        EmptyComponent
      ) : (
        NonEmptyComponent
      )}
    </div>
  );
};
