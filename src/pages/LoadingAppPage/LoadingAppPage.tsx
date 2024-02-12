import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useSetTitle("LogMeIn Rescue");

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
